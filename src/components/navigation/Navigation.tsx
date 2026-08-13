export function Navigation() {
  return (
    <header className="site-header">
      <a className="brand-link" href="#top" aria-label="GoGillion Technologies, home">
        <img
          className="brand-link__logo"
          src="/assets/brand/gogillion-logo-2.webp"
          alt="GoGillion Technologies"
        />
      </a>
      <nav aria-label="Primary navigation">
        <a href="#products">Products</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}
