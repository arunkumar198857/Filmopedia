import { Link } from "react-router-dom";
import "./SiteFooter.scss";

export default function SiteFooter(): JSX.Element {
    return (
        <footer className="site-footer">
            <div className="page-width footer-content">
                <nav className="footer-nav" aria-label="Footer navigation">
                    <Link to="/">Home</Link>
                    <Link to="/explore/movie">Movies</Link>
                    <Link to="/explore/tv">TV shows</Link>
                    <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">About TMDB</a>
                    <a href="https://developer.themoviedb.org/docs" target="_blank" rel="noreferrer">API documentation</a>
                </nav>
                <p className="footer-summary">
                    Filmopedia brings movie and television discovery together:
                    explore popular titles, browse cast and crew, and find your
                    next story to watch.
                </p>
                <nav className="footer-shortcuts" aria-label="Quick links">
                    <Link to="/explore/movie" aria-label="Browse movies" title="Browse movies">
                        <span aria-hidden="true">▶</span>
                    </Link>
                    <Link to="/explore/tv" aria-label="Browse TV shows" title="Browse TV shows">
                        <span aria-hidden="true">▣</span>
                    </Link>
                    <a
                        href="https://www.themoviedb.org/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Visit TMDB"
                        title="Visit TMDB"
                    >
                        <span aria-hidden="true">TMDB</span>
                    </a>
                    <a
                        href="https://developer.themoviedb.org/docs"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Read the TMDB API documentation"
                        title="TMDB API documentation"
                    >
                        <span aria-hidden="true">API</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/arunkumar198857"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Visit LinkedIn profile"
                        title="LinkedIn"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <path
                                fill="currentColor"
                                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.264 2.37 4.264 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z"
                            />
                        </svg>
                    </a>
                </nav>
                <p className="footer-attribution">
                    This product uses the{" "}
                    <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB API</a>{" "}
                    but is not endorsed or certified by TMDB.
                </p>
            </div>
        </footer>
    );
}
