import { useEffect, useState } from "react";

const CIUDADES = [
  { nombre: "Bogotá", lat: 4.711, lon: -74.0721 },
  { nombre: "Medellín", lat: 6.2442, lon: -75.5812 },
  { nombre: "Cali", lat: 3.4516, lon: -76.532 },
  { nombre: "Barranquilla", lat: 10.9685, lon: -74.7813 },
  { nombre: "Cartagena", lat: 10.391, lon: -75.4794 },
];

// Códigos WMO que devuelve Open-Meteo
function describir(codigo) {
  if (codigo === 0) return "Despejado";
  if (codigo <= 3) return "Parcialmente nublado";
  if (codigo === 45 || codigo === 48) return "Niebla";
  if (codigo >= 51 && codigo <= 57) return "Llovizna";
  if (codigo >= 61 && codigo <= 67) return "Lluvia";
  if (codigo >= 71 && codigo <= 77) return "Nieve";
  if (codigo >= 80 && codigo <= 82) return "Chubascos";
  if (codigo >= 95) return "Tormenta";
  return "Variable";
}

function recomendar(sensacion, probLluvia) {
  if (probLluvia >= 50) {
    return "Hay lluvia en camino: Hoodie Negro Mareta con capota y Jogger Cargo.";
  }
  if (sensacion <= 14) {
    return "Hace frío: Hoodie Negro Mareta y Jean Wide Leg.";
  }
  if (sensacion <= 22) {
    return "Clima templado: Buzo Crewneck Hueso con Jogger Cargo.";
  }
  return "Hace calor: Camiseta Oversize Calle y Gorra Snapback.";
}

function Clima() {
  const [ciudad, setCiudad] = useState(CIUDADES[0]);
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controlador = new AbortController();

    async function cargar() {
      setCargando(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          latitude: ciudad.lat,
          longitude: ciudad.lon,
          current: "temperature_2m,apparent_temperature,weather_code,wind_speed_10m",
          daily: "temperature_2m_max,temperature_2m_min,precipitation_probability_max",
          timezone: "auto",
        });
        const respuesta = await fetch(
          `https://api.open-meteo.com/v1/forecast?${params}`,
          { signal: controlador.signal }
        );
        if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`);
        setDatos(await respuesta.json());
      } catch (e) {
        if (e.name !== "AbortError") setError("No pudimos cargar el clima.");
      } finally {
        setCargando(false);
      }
    }

    cargar();
    return () => controlador.abort();
  }, [ciudad]);

  return (
    <section id="clima" className="bg-negro text-hueso py-12 md:py-16">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <h2 className="titulo text-4xl md:text-6xl mb-6">
          ¿Qué me <span className="text-rojo">pongo</span> hoy?
        </h2>

        <div className="flex flex-wrap gap-2 mb-8">
          {CIUDADES.map((c) => (
            <button
              key={c.nombre}
              onClick={() => setCiudad(c)}
              className={`px-4 py-2 border-2 font-bold italic uppercase text-sm transition-colors ${
                c.nombre === ciudad.nombre
                  ? "bg-rojo border-rojo text-hueso"
                  : "border-hueso hover:bg-hueso hover:text-negro"
              }`}
            >
              {c.nombre}
            </button>
          ))}
        </div>

        {cargando && <p>Consultando el clima...</p>}
        {error && <p className="text-rojo font-bold">{error}</p>}

        {datos && !cargando && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-hueso p-6">
              <p className="text-sm uppercase tracking-widest text-hueso/60">
                {ciudad.nombre}
              </p>
              <p className="titulo text-8xl my-2">
                {Math.round(datos.current.temperature_2m)}°
              </p>
              <p className="text-xl font-bold">
                {describir(datos.current.weather_code)}
              </p>
              <p className="text-hueso/70 mt-3 text-sm">
                Sensación: {Math.round(datos.current.apparent_temperature)}° ·
                Viento: {datos.current.wind_speed_10m} km/h
              </p>
              <p className="text-hueso/70 text-sm">
                Máx {Math.round(datos.daily.temperature_2m_max[0])}° · Mín{" "}
                {Math.round(datos.daily.temperature_2m_min[0])}° · Lluvia{" "}
                {datos.daily.precipitation_probability_max[0]}%
              </p>
            </div>

            <div className="bg-rojo p-6 flex flex-col justify-center">
              <p className="text-sm uppercase tracking-widest mb-2">
                Recomendación MARETA
              </p>
              <p className="titulo text-2xl md:text-3xl">
                {recomendar(
                  datos.current.apparent_temperature,
                  datos.daily.precipitation_probability_max[0]
                )}
              </p>
              <a href="#tienda" className="btn mt-6 self-start">
                Ver tienda
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Clima;
