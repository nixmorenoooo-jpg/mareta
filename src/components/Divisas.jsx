import { useEffect, useState } from "react";

const DIVISAS_URL = "https://api.frankfurter.dev/v2/rate/usd/cop";

function Divisas() {
  const [tasa, setTasa] = useState(null);
  const [fecha, setFecha] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [monto, setMonto] = useState("");
  const [sentido, setSentido] = useState("cop");

  useEffect(() => {
    const controlador = new AbortController();

    async function cargar() {
      try {
        const respuesta = await fetch(DIVISAS_URL, { signal: controlador.signal });
        if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`);
        const datos = await respuesta.json();
        setTasa(datos.rate);
        setFecha(datos.date);
      } catch (e) {
        if (e.name !== "AbortError") setError("No pudimos cargar la tasa de cambio.");
      } finally {
        setCargando(false);
      }
    }

    cargar();
    return () => controlador.abort();
  }, []);

  const numero = Number(monto);
  const hayMonto = monto !== "" && !Number.isNaN(numero);
  const resultado = tasa && hayMonto
    ? sentido === "cop" ? numero / tasa : numero * tasa
    : null;

  const salida = sentido === "cop" ? "USD" : "COP";

  const convertido = resultado === null
    ? null
    : resultado.toLocaleString(salida === "USD" ? "en-US" : "es-CO", {
        style: "currency",
        currency: salida,
        maximumFractionDigits: salida === "COP" ? 0 : 2,
      });

  return (
    <section className="border-2 border-negro bg-hueso p-4 flex flex-col gap-4">
      <h3 className="titulo text-2xl">Divisas</h3>

      {cargando && <p>Cargando tasa...</p>}
      {error && <p className="text-rojo font-bold">{error}</p>}

      {tasa && (
        <>
          <p className="text-sm">
            1 USD = {tasa.toLocaleString("es-CO", { maximumFractionDigits: 2 })} COP · {fecha}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setSentido("cop")}
              className={`border-2 border-negro px-3 py-1 text-sm ${
                sentido === "cop" ? "bg-negro text-hueso" : "bg-hueso"
              }`}
            >
              COP → USD
            </button>
            <button
              onClick={() => setSentido("usd")}
              className={`border-2 border-negro px-3 py-1 text-sm ${
                sentido === "usd" ? "bg-negro text-hueso" : "bg-hueso"
              }`}
            >
              USD → COP
            </button>
          </div>

          <input
            type="number"
            min="0"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder={`Monto en ${sentido === "cop" ? "COP" : "USD"}`}
            className="border-2 border-negro bg-hueso px-3 py-2 w-full"
          />

          {convertido && <p className="font-bold">{convertido}</p>}
        </>
      )}
    </section>
  );
}

export default Divisas;