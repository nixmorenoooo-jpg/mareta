const CATEGORIAS = [
  { valor: "", etiqueta: "Todas" },
  { valor: "camisetas", etiqueta: "Camisetas" },
  { valor: "buzos", etiqueta: "Buzos" },
  { valor: "pantalones", etiqueta: "Pantalones" },
  { valor: "accesorios", etiqueta: "Accesorios" },
];


function Buscador({ busqueda, onBuscar, categoria, onCategoria }) {
  return (
    <div className="flex flex-col gap-3 mb-8">
      <input
        type="search"
        value={busqueda}
        onChange={(e) => onBuscar(e.target.value)}
        placeholder="Buscar producto..."
        className="border-2 border-negro bg-hueso px-3 py-2 w-full"
      />

      <div className="flex flex-wrap gap-2">
        {CATEGORIAS.map((c) => (
          <button
            key={c.valor}
            onClick={() => onCategoria(c.valor)}
            className={`border-2 border-negro px-3 py-1 text-sm ${
              categoria === c.valor ? "bg-negro text-hueso" : "bg-hueso"
            }`}
          >
            {c.etiqueta}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Buscador;