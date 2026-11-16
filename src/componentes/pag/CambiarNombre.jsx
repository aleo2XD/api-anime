export default function CambiarNombre({ nombre, onCambiarNombre }) {
  function cambiarNombre(valor) {
    onCambiarNombre(valor)
  }

  return (
    <>
      <label className="visually-hidden" htmlFor="character-name">
        Nombre del personaje
      </label>
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        id="character-name"
        type="search"
        placeholder="Ej. Tanjiro Kamado..."
        value={nombre}
        onChange={(event) => cambiarNombre(event.target.value)}
      />
    </>
  )
}