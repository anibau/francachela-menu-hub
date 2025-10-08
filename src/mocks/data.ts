import { Producto, Receta, Combo, Punto } from '../types';

export const productosMock: Producto[] = [
  { 
    id: "1", 
    nombre: "Ron Bacardi 750ml", 
    precio: "40.00", 
    precio_mayoreo: "35.00", 
    imagen: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=400&fit=crop", 
    categoria: "Ron", 
    valor_puntos: "40",
    mostrar: true
  },
  { 
    id: "2", 
    nombre: "Whisky Glen 750ml", 
    precio: "120.00", 
    precio_mayoreo: "110.00", 
    imagen: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400&h=400&fit=crop", 
    categoria: "Whisky", 
    valor_puntos: "120",
    mostrar: true
  },
  { 
    id: "3", 
    nombre: "Coca-Cola 2L", 
    precio: "3.00", 
    precio_mayoreo: "2.50", 
    imagen: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop", 
    categoria: "Gaseosa", 
    valor_puntos: "3",
    mostrar: true
  },
  { 
    id: "4", 
    nombre: "Vodka Absolut 750ml", 
    precio: "80.00", 
    precio_mayoreo: "75.00", 
    imagen: "https://images.unsplash.com/photo-1560508801-95c82f73e5f1?w=400&h=400&fit=crop", 
    categoria: "Vodka", 
    valor_puntos: "80",
    mostrar: true
  },
  { 
    id: "5", 
    nombre: "Tequila Patron 750ml", 
    precio: "150.00", 
    precio_mayoreo: "140.00", 
    imagen: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&h=400&fit=crop", 
    categoria: "Tequila", 
    valor_puntos: "150",
    mostrar: true
  },
  { 
    id: "6", 
    nombre: "Cerveza Corona 355ml", 
    precio: "2.50", 
    precio_mayoreo: "2.00", 
    imagen: "https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=400&h=400&fit=crop", 
    categoria: "Cerveza", 
    valor_puntos: "2",
    mostrar: true
  },
];

export const recetarioMock: Receta[] = [
  { 
    id: "r1", 
    nombre: "Cuba Libre", 
    ingredientes: ["1", "3"], 
    pasos: "1) Llenar un vaso alto con hielo\n2) Agregar 50ml de ron\n3) Completar con Coca-Cola\n4) Añadir una rodaja de limón\n5) Revolver suavemente", 
    imagen: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&h=400&fit=crop", 
    categorias: ["Ron", "Gaseosa"],
    mostrar: true
  },
  { 
    id: "r2", 
    nombre: "Whisky Sour", 
    ingredientes: ["2"], 
    pasos: "1) En una coctelera agregar hielo\n2) Añadir 60ml de whisky\n3) Agregar 30ml de jugo de limón\n4) Añadir 15ml de jarabe simple\n5) Agitar vigorosamente\n6) Colar en vaso con hielo", 
    imagen: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=400&fit=crop", 
    categorias: ["Whisky"],
    mostrar: true
  },
  { 
    id: "r3", 
    nombre: "Vodka Tonic", 
    ingredientes: ["4"], 
    pasos: "1) Llenar vaso con hielo\n2) Agregar 50ml de vodka\n3) Completar con agua tónica\n4) Decorar con rodaja de limón", 
    imagen: "https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?w=400&h=400&fit=crop", 
    categorias: ["Vodka"],
    mostrar: true
  },
  { 
    id: "r4", 
    nombre: "Margarita", 
    ingredientes: ["5"], 
    pasos: "1) Escarchar el borde del vaso con sal\n2) En coctelera con hielo agregar 50ml de tequila\n3) Añadir 20ml de triple sec\n4) Agregar 25ml de jugo de limón\n5) Agitar y servir", 
    imagen: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop", 
    categorias: ["Tequila"],
    mostrar: true
  },
];

export const combosMock: Combo[] = [
  { 
    id: "c1", 
    nombre: "Combo Fiesta", 
    precio: "50.00", 
    items: ["1", "3"], 
    imagen: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=400&fit=crop", 
    categoria: "Fiesta", 
    valor_puntos: "50",
    mostrar: true
  },
  { 
    id: "c2", 
    nombre: "Pack Premium", 
    precio: "200.00", 
    items: ["2", "5"], 
    imagen: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop", 
    categoria: "Premium", 
    valor_puntos: "200",
    mostrar: true
  },
  { 
    id: "c3", 
    nombre: "Kit Cervecero", 
    precio: "20.00", 
    items: ["6"], 
    imagen: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop", 
    categoria: "Cerveza", 
    valor_puntos: "20",
    mostrar: true
  },
];

export const puntosMock: Punto[] = [
  { 
    id: "p1", 
    nombre: "Redimir: 1 Ron Bacardi", 
    precio: "40.00", 
    imagen: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=400&fit=crop", 
    categoria: "Ron", 
    valor_puntos: "400",
    mostrar: true
  },
  { 
    id: "p2", 
    nombre: "Redimir: 1 Whisky Glen", 
    precio: "120.00", 
    imagen: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400&h=400&fit=crop", 
    categoria: "Whisky", 
    valor_puntos: "1200",
    mostrar: true
  },
  { 
    id: "p3", 
    nombre: "Redimir: Combo Fiesta", 
    precio: "50.00", 
    imagen: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=400&fit=crop", 
    categoria: "Fiesta", 
    valor_puntos: "500",
    mostrar: true
  },
];
