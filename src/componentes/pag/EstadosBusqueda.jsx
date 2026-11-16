const RECOMENDACIONES = ['Monkey D. Luffy', 'Naruto Uzumaki', 'Goku']

export function EstadoCarga({ busqueda }) {
  return (
    <div className="status-message">
      <span className="loader" aria-hidden="true" />
      <p>Buscando a <strong>{busqueda}</strong> en el universo anime...</p>
    </div>
  )
}

export function EstadoError({ error }) {
  return (
    <div className="feedback error-message" role="alert">
      <span aria-hidden="true">!</span>
      <div><h2>Algo salió mal</h2><p>{error}</p></div>
    </div>
  )
}

export function EstadoSinResultados({ busqueda, onSeleccionar }) {
  return (
    <div className="feedback empty-state">
      <span className="empty-icon" aria-hidden="true">?</span>
      <div>
        <p className="eyebrow">NO ENCONTRAMOS RESULTADOS</p>
        <h2>No encontramos a “{busqueda}”</h2>
        <p>Prueba con uno de estos personajes:</p>
        <div className="recommendations">
          {RECOMENDACIONES.map((sugerencia) => (
            <button
              className="recommendation"
              key={sugerencia}
              onClick={() => onSeleccionar(sugerencia)}
              type="button"
            >
              {sugerencia}<span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}