import { FaWhatsapp } from "react-icons/fa6";

// Cambia el número por el tuyo (con indicativo, sin + ni espacios)
const NUMERO = "573000000000";
const MENSAJE = "Hola MARETA, quiero más información";

function WhatsAppButton() {
  const url = `https://wa.me/${NUMERO}?text=${encodeURIComponent(MENSAJE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed right-4 bottom-4 z-50 grid place-items-center w-14 h-14 rounded-full bg-[#25d366] text-white text-3xl shadow-lg"
    >
      <FaWhatsapp />
    </a>
  );
}

export default WhatsAppButton;
