import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchForm from "../search/SearchForm";

export default function SiteHeader() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState(
        () => localStorage.getItem("filmopedia-theme") || "light"
    );

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("filmopedia-theme", theme);
    }, [theme]);

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    return (
        <header className="site-header">
            <div className="page-width header-content">
                <Link className="brand" to="/" aria-label="Filmopedia home">
                    <span className="brand-mark" aria-hidden="true">F</span>
                    <span>Filmopedia</span>
                </Link>
                <nav className="main-nav" aria-label="Main navigation">
                    <Link to="/explore/movie">Movies</Link>
                    <Link to="/explore/tv">TV shows</Link>
                </nav>
                <div className="header-actions">
                    <SearchForm compact />
                    <button
                        className="theme-button"
                        type="button"
                        onClick={() =>
                            setTheme((current) =>
                                current === "light" ? "dark" : "light"
                            )
                        }
                        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                        title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                    >
                        {theme === "light" ? "◐" : "☼"}
                    </button>
                    <button
                        className="mobile-menu-toggle"
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-navigation"
                        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    >
                        <span className={`hamburger-icon${menuOpen ? " is-open" : ""}`} aria-hidden="true">
                            <span />
                            <span />
                            <span />
                        </span>
                    </button>
                </div>
            </div>
            {menuOpen && (
                <nav className="mobile-nav page-width" id="mobile-navigation" aria-label="Mobile navigation">
                    <Link to="/explore/movie" onClick={() => setMenuOpen(false)}>Movies</Link>
                    <Link to="/explore/tv" onClick={() => setMenuOpen(false)}>TV shows</Link>
                </nav>
            )}
        </header>
    );
}
