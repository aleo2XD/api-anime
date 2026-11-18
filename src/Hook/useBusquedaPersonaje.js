import { useEffect, useRef, useState } from 'react'
import { buscarPersonaje as consultarAniList } from '../services/anilist.js'

export default function useBusquedaPersonaje() {
  const [nombre, setNombre] = useState('')
  const [personaje, setPersonaje] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const timer = useRef(null)
  const controller = useRef(null)
  const idSolicitud = useRef(0)

  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
      controller.current?.abort()
    }
  }, [])

  function programarBusqueda(valor, espera = 500) {
    const consulta = valor.trim()
    clearTimeout(timer.current)
    controller.current?.abort()
    const idActual = ++idSolicitud.current

    setBusqueda(consulta)
    setPersonaje(null)
    setError('')

    if (!consulta) {
      setCargando(false)
      return
    }

    const nuevaController = new AbortController()
    controller.current = nuevaController
    setCargando(true)

    timer.current = setTimeout(async () => {
      try {
        const resultado = await consultarAniList(consulta, {
          signal: nuevaController.signal,
        })
        if (idSolicitud.current === idActual) setPersonaje(resultado)
      } catch (errorCapturado) {
        if (!nuevaController.signal.aborted && idSolicitud.current === idActual) {
          setError(`No se pudo consultar AniList: ${errorCapturado.message}`)
        }
      } finally {
        if (!nuevaController.signal.aborted && idSolicitud.current === idActual) {
          setCargando(false)
        }
      }
    }, espera)
  }

  function actualizarNombre(valor) {
    setNombre(valor)
    programarBusqueda(valor)
  }

  function ejecutarBusqueda() {
    if (!nombre.trim()) return false

    programarBusqueda(nombre, 0)
    return true
  }

  return {
    nombre,
    personaje,
    busqueda,
    cargando,
    error,
    actualizarNombre,
    ejecutarBusqueda,
  }
}
