import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { Location as RouteLocation } from "react-router-dom";
import SearchForm from "../search/SearchForm";
import "./SiteHeader.css";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
    const storedTheme: string | null = localStorage.getItem("filmopedia-theme");
    return storedTheme === "dark" ? "dark" : "light";
}

export default function SiteHeader(): JSX.Element {
    const location: RouteLocation = useLocation();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect((): void => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("filmopedia-theme", theme);
    }, [theme]);

    useEffect((): void => {
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
                            setTheme((current: Theme): Theme =>
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
                        onClick={() => setMenuOpen((open: boolean) => !open)}
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
