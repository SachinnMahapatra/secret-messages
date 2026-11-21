import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const closeMenu = () => setIsMenuOpen(false);
  const isCreatePage = location.pathname === "/create-link";

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" onClick={closeMenu} aria-label="MystMessage home">
          <span className="brand-mark" aria-hidden="true">m</span>
          <span className="brand-name">Myst<span>Message</span></span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
        >
          {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav id="primary-navigation" className={`primary-nav${isMenuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}>
            About
          </NavLink>
          <a className="nav-link nav-github" href="https://github.com/SachinnMahapatra" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
            GitHub
          </a>
          <Link to="/create-link" className={`button button-small${isCreatePage ? " button-small-active" : ""}`} onClick={closeMenu}>
            Create your link
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
