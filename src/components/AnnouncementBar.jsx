const MENSAJES = [
  "Hecha para la calle",
  "Envíos a toda Colombia",
  "Pago contraentrega",
  "Nuevos drops cada mes",
];

function AnnouncementBar() {

  const fila = [...MENSAJES, ...MENSAJES];

  return (
    <div className="bg-negro text-hueso overflow-hidden py-2 text-xs font-medium uppercase tracking-widest">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copia) => (
          <div key={copia} className="flex shrink-0">
            {fila.map((mensaje, i) => (
              <span key={i} className="px-6 whitespace-nowrap">
                {mensaje} <span className="text-rojo">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnnouncementBar;
