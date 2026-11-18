export default function Cabecera({ onNavigate }) {
  return (
    <header className="topbar">
      <a
        className="brand"
        href="/"
        aria-label="AnimeFinder, inicio"
        onClick={(event) => {
          event.preventDefault()
          onNavigate('/')
        }}
      >
        <span className="brand-mark" aria-hidden="true">ア</span>
        <span>ANIME<span className="brand-accent">FINDER</span></span>
      </a>
    </header>
  )
}