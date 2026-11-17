function Hero() {
  const categories = [
    "Camisetas",
    "Sets",
    "Tops y Bodies",
    "Pantalones/Jeans",
    "Buzos y Chaquetas",
    "Camisillas",
    "Sudaderas",
  ];

  const sides = [
    { label: "MUJER", bg: "bg-[#D13B20]", text: "text-white", position: "left-12" },
    { label: "HOMBRE", bg: "bg-[#E2DED6]", text: "text-black", position: "right-12" },
  ];

  return (
    <section>
      {/* Franja blanca de categorías */}
      <ul className="hidden md:flex justify-between px-10 py-3 text-xs bg-white border-b border-gray-200">
        {categories.map((category) => (
          <li key={category}>
            <a href="#" className="hover:underline">{category}</a>
          </li>
        ))}
      </ul>

      {/* Banner */}
      <div className="relative">
        <div className="grid grid-cols-2 h-[420px] md:h-[calc(100vh-150px)] overflow-hidden">
          {sides.map((side) => (
            <div key={side.label} className={`relative overflow-hidden ${side.bg}`}>
              <a
                href="#"
                className={`absolute bottom-10 ${side.position} ${side.text} text-xl tracking-wide hover:underline`}
              >
                {side.label} →
              </a>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="bg-black text-white px-6 py-4 text-center">
            <h1 className="text-3xl md:text-6xl font-bold italic tracking-widest">
              MARETA
            </h1>
            <p className="tracking-[0.3em] mt-2 text-xs md:text-base">
              HECHA PARA LA CALLE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
