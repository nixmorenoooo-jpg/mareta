import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#inicio", texto: "Inicio" },
  { href: "#tienda", texto: "Tienda" },
  { href: "#clima", texto: "Clima" },
];

function Navbar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-hueso border-b-2 border-negro">
      <div className="w-[92%] max-w-[1200px] mx-auto flex items-center justify-between h-16">
        <a href="#inicio" className="titulo text-3xl">
          MARE<span className="text-rojo">TA</span>
        </a>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          className="md:hidden border-2 border-negro p-1.5"
          onClick={() => setAbierto(!abierto)}
          aria-expanded={abierto}
          aria-label="Abrir menú"
        >
          {abierto ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Links (escritorio) */}
        <nav className="hidden md:block">
          <ul className="flex gap-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="titulo text-sm px-4 py-2 hover:bg-rojo hover:text-hueso"
                >
                  {l.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Links (móvil) */}
      {abierto && (
        <nav className="md:hidden border-t-2 border-negro">
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setAbierto(false)}
                  className="titulo block px-[4%] py-4 border-b border-negro/15 hover:bg-rojo hover:text-hueso"
                >
                  {l.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
