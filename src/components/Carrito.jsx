function Carrito({ items, onQuitar }) {
  const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

  return (
    <aside className="border-2 border-negro bg-hueso p-4 flex flex-col gap-3">
      <h3 className="titulo text-2xl">Carrito</h3>

      {items.length === 0 && <p className="text-sm">Aún no has agregado productos.</p>}

      {items.map((item) => (
        <div key={item.id} className="flex justify-between items-center text-sm">
          <span>{item.nombre} x{item.cantidad}</span>
          <div className="flex items-center gap-2">
            <span>${(item.precio * item.cantidad).toLocaleString("es-CO")}</span>
            <button onClick={() => onQuitar(item.id)} className="text-rojo font-bold">
              Quitar
            </button>
          </div>
        </div>
      ))}

      <p className="font-bold border-t-2 border-negro pt-3">
        Total: ${total.toLocaleString("es-CO")} COP
      </p>
    </aside>
  );
}

export default Carrito;