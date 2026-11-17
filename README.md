# MARETA - Tienda online

Tienda de ropa urbana hecha con React y Vite, con una API propia en Express.
Proyecto académico, inspirado en la marca Mareta.

**Equipo:** Danna Stephania González y Laura Sofia Barrera Moreno

## Enlaces

- Página en producción (Vercel): https://mareta-alpha.vercel.app/
- API (Render): https://mareta-9mc2.onrender.com
- Release v1.0.0 (APK Android): [enlace del release de GitHub]

## Tecnologías

- React 19 + Vite
- Tailwind CSS
- Express (API en `server/`)
- Open-Meteo (clima) y Frankfurter (tasa COP/USD)
- Capacitor (versión Android)

## Funcionalidades

- Catálogo de productos con fotos, precio en COP y tallas
- Buscador por nombre y filtros por categoría
- Carrito con cantidades, quitar productos y total
- Módulo de divisas COP/USD con la tasa del día
- Módulo del clima
- Barra de anuncios, banner principal y botón de WhatsApp

## Componentes

En `src/components/`:

- `AnnouncementBar`: barra de mensajes en movimiento
- `Navbar`: menú de navegación
- `Hero`: banner principal
- `Buscador`: campo de búsqueda y botones de categoría
- `ProductList`: carga los productos desde la API y coordina filtros y carrito
- `ProductCard`: tarjeta de cada producto
- `Carrito`: lista de productos agregados y total
- `Divisas`: conversión COP/USD con Frankfurter
- `Clima`: clima con Open-Meteo
- `Footer`: pie de página
- `WhatsAppButton`: botón flotante de WhatsApp

## Cómo ejecutarlo en tu computador

Necesitas Node.js instalado. Son dos procesos que deben correr al mismo tiempo.

**1. La API** (en una terminal):

```bash
cd server
npm install
npm start
```

Queda en `http://localhost:3001`. Puedes probarla en `http://localhost:3001/api/productos`.

**2. La tienda** (en otra terminal, desde la carpeta raíz del proyecto):

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

### Variable de entorno

Por defecto, la tienda usa `http://localhost:3001` como API. Para apuntar a otra URL (por ejemplo, la de Render), crea un archivo `.env` en la raíz con:

```
VITE_API_URL=https://mareta-9mc2.onrender.com
```

## Rutas de la API

- `GET /api/productos`: todos los productos
- `GET /api/productos?categoria=buzos`: filtra por categoría
- `GET /api/productos?q=hoodie`: busca por nombre
- `GET /api/productos/:id`: un producto

## Versión Android

La app móvil se genera con Capacitor. Para compilarla:

```bash
npm run build
npx cap sync android
```

Luego abre `android/` en Android Studio y genera el APK. Antes de compilarlo, `VITE_API_URL` debe apuntar a la API desplegada, porque en el teléfono `localhost` no existe.
