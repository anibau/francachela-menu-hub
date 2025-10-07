/* eslint-disable */
/* tslint:disable */

/**
 * Mock Service Worker.
 * @see https://github.com/mswjs/msw
 * - Please do NOT modify this file.
 * - Please do NOT serve this file on production.
 */

const PACKAGE_VERSION = '2.0.0'
const INTEGRITY_CHECKSUM = '26357c79639bfa20d64c0efca2a87423'
const IS_MOCKED_RESPONSE = Symbol('isMockedResponse')
const activeClientIds = new Set()

self.addEventListener('install', function () {
  self.skipWaiting()
})

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', async function (event) {
  const clientId = event.source.id

  if (!clientId || !self.clients) {
    return
  }

  const client = await self.clients.get(clientId)

  if (!client) {
    return
  }

  const allClients = await self.clients.matchAll({
    type: 'window',
  })

  switch (event.data) {
    case 'KEEPALIVE_REQUEST': {
      sendToClient(client, {
        type: 'KEEPALIVE_RESPONSE',
      })
      break
    }

    case 'INTEGRITY_CHECK_REQUEST': {
      sendToClient(client, {
        type: 'INTEGRITY_CHECK_RESPONSE',
        payload: {
          packageVersion: PACKAGE_VERSION,
          checksum: INTEGRITY_CHECKSUM,
        },
      })
      break
    }

    case 'MOCK_ACTIVATE': {
      activeClientIds.add(clientId)

      sendToClient(client, {
        type: 'MOCKING_ENABLED',
        payload: true,
      })
      break
    }

    case 'MOCK_DEACTIVATE': {
      activeClientIds.delete(clientId)
      break
    }

    case 'CLIENT_CLOSED': {
      activeClientIds.delete(clientId)

      const remainingClients = allClients.filter((client) => {
        return client.id !== clientId
      })

      if (remainingClients.length === 0) {
        self.registration.unregister()
      }

      break
    }
  }
})

self.addEventListener('fetch', function (event) {
  const { request } = event

  if (request.mode === 'navigate') {
    return
  }

  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
    return
  }

  if (activeClientIds.size === 0) {
    return
  }

  const requestId = crypto.randomUUID()

  event.respondWith(
    handleRequest(event, requestId).catch((error) => {
      console.error(
        '[MSW] Failed to mock a "%s" request to "%s": %s',
        request.method,
        request.url,
        error,
      )
    }),
  )
})

async function handleRequest(event, requestId) {
  const client = await event.target.clients.get(event.clientId)

  if (!client) {
    return passthrough(event.request)
  }

  if (!activeClientIds.has(client.id)) {
    return passthrough(event.request)
  }

  const clonedRequest = event.request.clone()
  sendToClient(client, {
    type: 'REQUEST',
    payload: {
      id: requestId,
      url: clonedRequest.url,
      mode: clonedRequest.mode,
      method: clonedRequest.method,
      headers: Object.fromEntries(clonedRequest.headers.entries()),
      cache: clonedRequest.cache,
      credentials: clonedRequest.credentials,
      destination: clonedRequest.destination,
      integrity: clonedRequest.integrity,
      redirect: clonedRequest.redirect,
      referrer: clonedRequest.referrer,
      referrerPolicy: clonedRequest.referrerPolicy,
      body: await clonedRequest.text(),
      keepalive: clonedRequest.keepalive,
    },
  })

  const responsePromise = new Promise((resolve) => {
    const responseListener = (event) => {
      if (event.data?.type === 'RESPONSE' && event.data?.payload?.id === requestId) {
        self.removeEventListener('message', responseListener)
        resolve(event.data)
      }
    }

    self.addEventListener('message', responseListener)
  })

  const responseMessage = await responsePromise

  if (responseMessage.payload.type === 'MOCK_NOT_FOUND') {
    return passthrough(event.request)
  }

  const mockedResponse = respondWithMock(responseMessage.payload)

  Object.defineProperty(mockedResponse, IS_MOCKED_RESPONSE, {
    value: true,
    enumerable: true,
  })

  return mockedResponse
}

function sendToClient(client, message) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel()

    channel.port1.onmessage = (event) => {
      if (event.data && event.data.error) {
        return reject(event.data.error)
      }

      resolve(event.data)
    }

    client.postMessage(message, [channel.port2])
  })
}

async function passthrough(request) {
  const response = await fetch(request)
  return response
}

function respondWithMock(response) {
  const responseInit = {
    status: response.status,
    statusText: response.statusText,
    headers: new Headers(response.headers),
  }

  const responseBody =
    typeof response.body === 'string' ? response.body : JSON.stringify(response.body)

  return new Response(responseBody, responseInit)
}
