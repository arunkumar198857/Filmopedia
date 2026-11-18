import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEvent, ChangeEvent } from "react";
import type { NavigateFunction } from "react-router-dom";

interface SearchFormProps {
    compact?: boolean;
}

export default function SearchForm({ compact = false }: SearchFormProps): JSX.Element {
    const [term, setTerm] = useState<string>("");
    const navigate: NavigateFunction = useNavigate();

    function submit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const searchTerm: string = term.trim();
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
                onChange={(event: ChangeEvent<HTMLInputElement>) => setTerm(event.target.value)}
                placeholder="Search movies, shows, and people"
                type="search"
            />
            <button type="submit">Search</button>
        </form>
    );
}
