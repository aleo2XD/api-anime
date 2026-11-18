import { useEffect, useState } from 'react'
import AnimeFinder from './pages/AnimeFinder.jsx'

export default function App() {
  const [ruta, setRuta] = useState(() => window.location.pathname)

  useEffect(() => {
    function actualizarRuta() {
      setRuta(window.location.pathname)
    }

    window.addEventListener('popstate', actualizarRuta)
    return () => window.removeEventListener('popstate', actualizarRuta)
  }, [])

  useEffect(() => {
    if (ruta !== '/' && ruta !== '/buscar') {
      window.history.replaceState({}, '', '/')
      setRuta('/')
    }
  }, [ruta])

  function navegar(destino) {
    if (window.location.pathname === destino) return
    window.history.pushState({}, '', destino)
    setRuta(destino)
  }

  const paginas = {
    '/': AnimeFinder,
    '/buscar': AnimeFinder,
  }
  const Pagina = paginas[ruta] ?? AnimeFinder

  return <Pagina onNavigate={navegar} />
}
