
function ProductCard({ producto, onAgregar }) {
  const { nombre, precio, categoria, imagen, descripcion, tallas = [] } = producto;

  return (
    <article className="flex flex-col border-2 border-negro bg-hueso h-full">
      {imagen ? (
        <img
          src={imagen}
          alt={nombre}
          className="w-full aspect-[3/4] object-cover"
        />
      ) : (
       
        <div className="w-full aspect-[3/4] bg-negro text-rojo grid place-items-center">
          <span className="titulo text-8xl">
            {categoria?.charAt(0) ?? "M"}
          </span>
        </div>
      )}

      <div className="p-3 flex flex-col gap-1 flex-1">
        <p className="text-[10px] uppercase tracking-widest text-negro/60">
          {categoria}
        </p>
        <h3 className="titulo text-base">{nombre}</h3>
        {descripcion && (
          <p className="text-xs text-negro/70 line-clamp-2">{descripcion}</p>
        )}
        <p className="font-bold mt-1">
          ${precio.toLocaleString("es-CO")} COP
        </p>

        {tallas.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {tallas.map((talla) => (
              <span
                key={talla}
                className="border border-negro text-[11px] px-1.5 py-0.5"
              >
                {talla}
              </span>
            ))}
          </div>
        )}

        {onAgregar && (
          <button
            onClick={() => onAgregar(producto)}
            className="btn mt-auto text-sm py-2.5"
          >
            Agregar
          </button>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
