import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchForm({ compact = false }) {
    const [term, setTerm] = useState("");
    const navigate = useNavigate();

    function submit(event) {
        event.preventDefault();
        const searchTerm = term.trim();
        if (searchTerm) navigate(`/search/${encodeURIComponent(searchTerm)}`);
    }

    return (
        <form className={`search-form${compact ? " search-form-compact" : ""}`} onSubmit={submit}>
            <label className="visually-hidden" htmlFor={compact ? "header-search" : "hero-search"}>
                Search movies and TV shows
            </label>
            <input
                id={compact ? "header-search" : "hero-search"}
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="Search movies, shows, and people"
                type="search"
            />
            <button type="submit">Search</button>
        </form>
    );
}
