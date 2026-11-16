import { useEffect, useRef, useState } from 'react'
import TarjetaPersonaje from '../componentes/tarjeta.jsx'
import Cabecera from '../componentes/pag/Cabecera.jsx'
import Buscar from '../componentes/pag/Buscar.jsx'
import {
  EstadoCarga,
  EstadoError,
  EstadoSinResultados,
} from '../componentes/pag/EstadosBusqueda.jsx'
import PiePagina from '../componentes/pag/PiePagina.jsx'
import { buscarPersonaje } from '../services/anilist.js'

export default function AnimeFinder({ onNavigate }) {
  const [nombre, setNombre] = useState('')
  const [personaje, setPersonaje] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [solicitud, setSolicitud] = useState(0)
  const ultimaSolicitud = useRef(0)
  const idPeticion = useRef(0)

  useEffect(() => {
    const consulta = nombre.trim()
    if (!consulta) return undefined

    const controller = new AbortController()
    const inmediata = solicitud !== ultimaSolicitud.current
    ultimaSolicitud.current = solicitud
    const idActual = idPeticion.current

    const timer = setTimeout(async () => {
      try {
        const resultado = await buscarPersonaje(consulta, { signal: controller.signal })
        if (idPeticion.current === idActual) setPersonaje(resultado)
      } catch (error) {
        if (!controller.signal.aborted && idPeticion.current === idActual) {
          setError(`No se pudo consultar AniList: ${error.message}`)
        }
      } finally {
        if (!controller.signal.aborted && idPeticion.current === idActual) {
          setCargando(false)
        }
      }
    }, inmediata ? 0 : 500)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [nombre, solicitud])

  function actualizarNombre(valor) {
    const consulta = valor.trim()
    const mismaConsulta = consulta && consulta === nombre.trim()
    idPeticion.current += 1
    setNombre(valor)
    setBusqueda(consulta)
    setPersonaje(null)
    setError('')
    setCargando(Boolean(consulta))
    if (mismaConsulta) setSolicitud((actual) => actual + 1)
  }

  function ejecutarBusqueda() {
    if (!nombre.trim()) return
    onNavigate('/buscar')
    idPeticion.current += 1
    setBusqueda(nombre.trim())
    setPersonaje(null)
    setError('')
    setCargando(true)
    setSolicitud((actual) => actual + 1)
  }

  return (
    <main className="app-shell">
      <Cabecera onNavigate={onNavigate} />

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
