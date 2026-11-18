import CambiarNombre from './CambiarNombre.jsx'

export default function Buscar({
  nombre,
  cargando,
  onBuscar,
  onCambiarNombre,
}) {
  function buscar(event) {
    event.preventDefault()
    onBuscar()
  }

  return (
    <form className="search-form" onSubmit={buscar}>
      <CambiarNombre nombre={nombre} onCambiarNombre={onCambiarNombre} />
      <button type="submit" disabled={!nombre.trim()}>
        {cargando ? 'Buscando...' : 'Buscar personaje'}
        {!cargando && <span aria-hidden="true">↗</span>}
      </button>
    </form>
  )
}