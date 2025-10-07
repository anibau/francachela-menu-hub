# Francachela Landing

Aplicación frontend para catálogo de productos, combos, sistema de puntos y recetario de cócteles, con integración a Google Sheets.

## 🚀 Características

- ✅ Catálogo completo de productos con filtros por categoría
- ✅ Sistema de combos con descuentos
- ✅ Programa de puntos y redención
- ✅ Recetario de cócteles con filtrado inteligente
- ✅ Integración con Google Sheets (URLs configurables)
- ✅ Mocks locales con MSW para desarrollo
- ✅ Variables de entorno para control de precios/puntos
- ✅ Diseño responsive y premium
- ✅ TypeScript + React + Vite + TailwindCSS

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <your-repo-url>
cd francachela-landing

# Instalar dependencias
npm install

# Copiar archivo de configuración
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

## ⚙️ Configuración

### Variables de Entorno

Edita el archivo `.env` con tus configuraciones:

```env
# Usar mocks locales (true) o Google Sheets (false)
VITE_USE_MOCKS=true

# Mostrar precios y puntos
VITE_SHOW_PRICES=true
VITE_SHOW_POINTS=true

# URLs de Google Sheets (cuando USE_MOCKS=false)
VITE_SHEETS_URL_PRODUCTOS=https://script.google.com/...
VITE_SHEETS_URL_RECETARIO=https://script.google.com/...
VITE_SHEETS_URL_COMBOS=https://script.google.com/...
VITE_SHEETS_URL_PUNTOS=https://script.google.com/...
```

### Modo de Desarrollo (con Mocks)

Por defecto, la aplicación usa `MSW` (Mock Service Worker) para simular datos:

1. `VITE_USE_MOCKS=true` en `.env`
2. Los datos vienen de `src/mocks/data.ts`
3. Puedes editar los mocks para probar diferentes escenarios

### Modo Producción (con Google Sheets)

1. Configurar Google Sheets (ver abajo)
2. `VITE_USE_MOCKS=false` en `.env`
3. Configurar las URLs en variables de entorno

## 📊 Configuración de Google Sheets

### 1. Crear el spreadsheet

Crea un Google Spreadsheet con 4 pestañas:
- `PRODUCTOS`
- `RECETARIO`
- `COMBOS`
- `PUNTOS`

### 2. Estructura de datos

#### Pestaña PRODUCTOS
```
ID | NOMBRE | PRECIO | PRECIO_MAYOREO | IMAGEN | CATEGORIA | VALOR_PUNTOS
1  | Ron Bacardi 750ml | 40.00 | 35.00 | https://... | Ron | 40
```

#### Pestaña RECETARIO
```
ID | NOMBRE | INGREDIENTES | PASOS | IMAGEN | CATEGORIAS
r1 | Cuba Libre | 1,3 | 1) Llenar vaso... | https://... | Ron,Gaseosa
```

*INGREDIENTES* = IDs de productos separados por comas  
*CATEGORIAS* = opcional, si no existe se infiere de productos

#### Pestaña COMBOS
```
ID | NOMBRE | PRECIO | ITEMS | IMAGEN | CATEGORIA | VALOR_PUNTOS
c1 | Combo Fiesta | 50.00 | 1,3 | https://... | Fiesta | 50
```

*ITEMS* = IDs de productos separados por comas

#### Pestaña PUNTOS
```
ID | NOMBRE | PRECIO | IMAGEN | CATEGORIA | VALOR_PUNTOS
p1 | Redimir: 1 Ron | 40.00 | https://... | Ron | 400
```

### 3. Crear Apps Script

1. En tu spreadsheet: `Extensiones > Apps Script`
2. Pega este código:

```javascript
function doGet(e) {
  const sheetName = e.parameter.sheet || 'PRODUCTOS';
  const ss = SpreadsheetApp.openById('TU_SPREADSHEET_ID');
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'Sheet not found' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data.shift();
  
  const json = data.map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });
  
  return ContentService
    .createTextOutput(JSON.stringify(json))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. `Implementar > Nueva implementación`
4. Tipo: `Aplicación web`
5. Ejecutar como: `Yo`
6. Quién tiene acceso: `Cualquier usuario`
7. Copiar la URL generada

### 4. Configurar URLs en .env

```env
VITE_SHEETS_URL_PRODUCTOS=https://script.google.com/.../exec?sheet=PRODUCTOS
VITE_SHEETS_URL_RECETARIO=https://script.google.com/.../exec?sheet=RECETARIO
VITE_SHEETS_URL_COMBOS=https://script.google.com/.../exec?sheet=COMBOS
VITE_SHEETS_URL_PUNTOS=https://script.google.com/.../exec?sheet=PUNTOS
```

## 🖼️ Imágenes

### Cloudinary (Opcional)

Si usas Cloudinary para alojar imágenes:

```env
VITE_CLOUDINARY_CLOUD_NAME=tu_cloud_name
```

Luego usa URLs como:
```
https://res.cloudinary.com/TU_CLOUD/image/upload/v1234567890/producto-1.jpg
```

### URLs directas

Puedes usar cualquier URL pública en la columna `IMAGEN`:
- Cloudinary
- Unsplash
- ImgBB
- Tu propio servidor

## 🏗️ Estructura del Proyecto

```
francachela-landing/
├── src/
│   ├── components/
│   │   ├── ProductCard.tsx
│   │   ├── CategorySelector.tsx
│   │   ├── SearchBar.tsx
│   │   ├── RecipeModal.tsx
│   │   └── Navbar.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── ProductosPage.tsx
│   │   ├── CombosPage.tsx
│   │   ├── PuntosPage.tsx
│   │   ├── RecetarioPage.tsx
│   │   └── ContactoPage.tsx
│   ├── services/
│   │   └── googleSheetsAPI.ts
│   ├── hooks/
│   │   └── useGoogleSheetData.ts
│   ├── mocks/
│   │   ├── browser.ts
│   │   ├── handlers.ts
│   │   └── data.ts
│   ├── types/
│   │   └── index.ts
│   └── App.tsx
├── .env.example
└── README.md
```

## 🚢 Despliegue en GitHub Pages

### 1. Configurar base en vite.config.ts

```typescript
export default defineConfig({
  base: '/francachela-landing/', // nombre de tu repo
  // ...resto de config
})
```

### 2. Build y Deploy

```bash
# Build de producción
npm run build

# Si usas gh-pages
npm install -D gh-pages
npx gh-pages -d dist
```

### 3. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. `Settings > Pages`
3. Source: `gh-pages` branch
4. Save

Tu app estará en: `https://tu-usuario.github.io/francachela-landing/`

### 4. Variables de entorno en producción

⚠️ **Importante**: Las variables `VITE_*` se inyectan en build time.

Para producción:
1. Crea un archivo `.env.production`:
```env
VITE_USE_MOCKS=false
VITE_SHOW_PRICES=true
VITE_SHOW_POINTS=true
VITE_SHEETS_URL_PRODUCTOS=https://...
VITE_SHEETS_URL_RECETARIO=https://...
VITE_SHEETS_URL_COMBOS=https://...
VITE_SHEETS_URL_PUNTOS=https://...
```

2. Build con ese archivo:
```bash
npm run build
```

## 📝 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm run preview      # Preview del build
npm run lint         # Linter
```

## 🎨 Personalización

### Colores y Diseño

Edita `src/index.css` para cambiar el sistema de diseño:

```css
:root {
  --primary: 38 92% 50%;        /* Dorado */
  --secondary: 0 0% 15%;        /* Negro elegante */
  --accent: 0 70% 45%;          /* Rojo vino */
  /* ... más tokens */
}
```

### Componentes

Todos los componentes usan el sistema de diseño de shadcn/ui y están en `src/components/`.

## 🐛 Troubleshooting

### Los mocks no funcionan

1. Verifica que `VITE_USE_MOCKS=true` en `.env`
2. Asegúrate de que existe `public/mockServiceWorker.js`
3. Revisa la consola del navegador

### Google Sheets no responde

1. Verifica que el script esté publicado como "Aplicación web"
2. Comprueba que el acceso sea "Cualquier usuario"
3. Prueba la URL directamente en el navegador
4. Revisa CORS (Apps Script permite CORS por defecto)

### Build falla

1. Verifica TypeScript: `npm run build`
2. Revisa imports y tipos
3. Comprueba que todas las dependencias estén instaladas

## 📄 Licencia

MIT

## 👥 Contacto

Para más información: contacto@francachela.com
