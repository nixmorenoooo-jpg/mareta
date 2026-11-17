import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Catálogo de MARETA (precios en COP). Sin fotos por ahora:
// el campo "imagen" queda en null y la tarjeta muestra un bloque de marca.
const productos = [
  { id: 1, nombre: "Camiseta Oversize Calle", precio: 95000, categoria: "camisetas", imagen: null, descripcion: "Algodón pesado, corte amplio y logo en el pecho.", tallas: ["S", "M", "L", "XL"] },
  { id: 2, nombre: "Camiseta Mareta Roja", precio: 99000, categoria: "camisetas", imagen: null, descripcion: "Rojo intenso con estampado en la espalda.", tallas: ["S", "M", "L"] },
  { id: 3, nombre: "Hoodie Negro Mareta", precio: 189000, categoria: "buzos", imagen: null, descripcion: "Capota doble, bolsillo canguro y felpa interna.", tallas: ["S", "M", "L", "XL"] },
  { id: 4, nombre: "Buzo Crewneck Hueso", precio: 169000, categoria: "buzos", imagen: null, descripcion: "Cuello redondo, color hueso y bordado rojo.", tallas: ["M", "L", "XL"] },
  { id: 5, nombre: "Jogger Cargo Negro", precio: 175000, categoria: "pantalones", imagen: null, descripcion: "Bolsillos laterales y ajuste elástico en el tobillo.", tallas: ["28", "30", "32", "34"] },
  { id: 6, nombre: "Jean Wide Leg Washed", precio: 210000, categoria: "pantalones", imagen: null, descripcion: "Pierna ancha, lavado desgastado y tiro alto.", tallas: ["28", "30", "32", "34"] },
  { id: 7, nombre: "Gorra Mareta Snapback", precio: 69000, categoria: "accesorios", imagen: null, descripcion: "Visera plana, ajustable y bordado frontal.", tallas: ["Única"] },
  { id: 8, nombre: "Tote Bag Calle", precio: 45000, categoria: "accesorios", imagen: null, descripcion: "Lona resistente con asa larga.", tallas: ["Única"] },
];

app.get("/", (req, res) => {
  res.json({ api: "MARETA", estado: "ok", rutas: ["/api/productos", "/api/productos/:id"] });
});

// GET /api/productos           -> todos los productos
// GET /api/productos?categoria=buzos
// GET /api/productos?q=hoodie
app.get("/api/productos", (req, res) => {
  const { categoria, q } = req.query;
  let resultado = productos;

  if (categoria) {
    resultado = resultado.filter((p) => p.categoria === String(categoria).toLowerCase());
  }
  if (q) {
    const texto = String(q).toLowerCase();
    resultado = resultado.filter((p) => p.nombre.toLowerCase().includes(texto));
  }

  res.json(resultado);
});

// GET /api/productos/3 -> un producto
app.get("/api/productos/:id", (req, res) => {
  const producto = productos.find((p) => p.id === Number(req.params.id));
  if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(producto);
});

app.listen(PORT, () => {
  console.log(`API MARETA escuchando en el puerto ${PORT}`);
});