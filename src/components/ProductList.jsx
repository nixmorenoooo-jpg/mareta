import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

// En local usa el servidor en el puerto 3001; en producción, la URL de Render
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

function ProductList() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controlador = new AbortController();

    async function cargar() {
      try {
        const respuesta = await fetch(`${API_URL}/api/productos`, {
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
  }, []);

  return (
    <section id="tienda" className="w-[92%] max-w-[1200px] mx-auto py-12 md:py-16">
      <h2 className="titulo text-4xl md:text-6xl mb-8">
        La <span className="text-rojo">tienda</span>
      </h2>

      {cargando && <p>Cargando productos...</p>}
      {error && <p className="text-rojo font-bold">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
