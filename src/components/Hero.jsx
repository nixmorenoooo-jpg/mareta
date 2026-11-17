function Hero() {
  return (
    <section id="inicio" className="bg-negro text-hueso py-14 md:py-24">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <h1 className="titulo text-rojo text-[22vw] md:text-[10rem] mb-3">
          MARETA
        </h1>
        <h2 className="titulo text-4xl md:text-6xl mb-5">
          Hecha para la calle.
        </h2>
        <p className="max-w-md text-hueso/75 mb-7">
          Streetwear urbano para quienes no piden permiso. Piezas atrevidas,
          cortes amplios y actitud de sobra.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#tienda" className="btn-rojo">
            Ver tienda
          </a>
          <a
            href="#clima"
            className="inline-block border-2 border-hueso px-7 py-3.5 font-bold italic uppercase tracking-wide hover:bg-hueso hover:text-negro transition-colors"
          >
            ¿Qué me pongo hoy?
          </a>
        </div>
        <img
          src="/banner-mareta.svg"
          alt="Banner de Mareta"
          className="w-full mt-10 border-2 border-hueso"
        />
      </div>
    </section>
  );
}

export default Hero;
