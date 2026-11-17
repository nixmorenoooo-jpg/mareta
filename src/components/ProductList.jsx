import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Buscador from "./Buscador";
import Carrito from "./Carrito";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

function ProductList() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const controlador = new AbortController();

    const params = new URLSearchParams();
    if (categoria) params.set("categoria", categoria);
    if (busqueda.trim()) params.set("q", busqueda.trim());

    async function cargar() {
      setCargando(true);
      setError(null);
      try {
        const respuesta = await fetch(`${API_URL}/api/productos?${params}`, {
          signal: controlador.signal,
        });
        if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`);
        setProductos(await respuesta.json());
      } catch (e) {
        if (e.name !== "AbortError") setError("No pudimos cargar los productos.");
      } finally {
        setCargando(false);
      }
    }

    cargar();
    return () => controlador.abort();
  }, [busqueda, categoria]);

  function agregarAlCarrito(producto) {
    setItems((actual) => {
      const existente = actual.find((item) => item.id === producto.id);
      if (existente) {
        return actual.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...actual, { ...producto, cantidad: 1 }];
    });
  }

  function quitarDelCarrito(id) {
    setItems((actual) => actual.filter((item) => item.id !== id));
  }

  return (
    <section id="tienda" className="w-[92%] max-w-[1200px] mx-auto py-12 md:py-16">
      <h2 className="titulo text-4xl md:text-6xl mb-8">
        La <span className="text-rojo">tienda</span>
      </h2>

      <Buscador
        busqueda={busqueda}
        onBuscar={setBusqueda}
        categoria={categoria}
        onCategoria={setCategoria}
      />

      {cargando && <p>Cargando productos...</p>}
      {error && <p className="text-rojo font-bold">{error}</p>}
      {!cargando && !error && productos.length === 0 && (
        <p>No encontramos productos con esos filtros.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onAgregar={agregarAlCarrito}
          />
        ))}
      </div>

      <div className="mt-10">
        <Carrito items={items} onQuitar={quitarDelCarrito} />
      </div>
    </section>
  );
}

export default ProductList;