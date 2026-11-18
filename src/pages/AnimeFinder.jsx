import useBusquedaPersonaje from '../Hook/useBusquedaPersonaje.js'
import useNavegacionAnime from '../Hook/useNavegacionAnime.js'
import TarjetaPersonaje from '../orquestador/tarjeta.jsx'
import Cabecera from '../componentes/pag/Cabecera.jsx'
import Buscar from '../componentes/pag/Buscar.jsx'
import {
  EstadoCarga,
  EstadoError,
  EstadoSinResultados,
} from '../componentes/pag/EstadosBusqueda.jsx'
import PiePagina from '../componentes/pag/PiePagina.jsx'

export default function AnimeFinder() {
  const {
    nombre,
    personaje,
    busqueda,
    cargando,
    error,
    actualizarNombre,
    ejecutarBusqueda: buscarPersonaje,
  } = useBusquedaPersonaje()
  const { irInicio, irABuscar } = useNavegacionAnime()

  function ejecutarBusqueda() {
    if (buscarPersonaje()) irABuscar()
  }

  return (
    <main className="app-shell">
      <Cabecera onNavigate={irInicio} />

      <section className="hero">
        <h1>¿Quién es tu<br /><span>personaje favorito?</span></h1>
        <Buscar
          nombre={nombre}
          cargando={cargando}
          onBuscar={ejecutarBusqueda}
          onCambiarNombre={actualizarNombre}
        />
      </section>

      <section className="results" aria-live="polite">
        {cargando && <EstadoCarga busqueda={busqueda} />}
        {!cargando && error && <EstadoError error={error} />}
        {!cargando && personaje && <TarjetaPersonaje personaje={personaje} />}
        {!cargando && !error && !personaje && busqueda && (
          <EstadoSinResultados
            busqueda={busqueda}
            onSeleccionar={actualizarNombre}
          />
        )}
      </section>

      <PiePagina />
    </main>
  )
}
