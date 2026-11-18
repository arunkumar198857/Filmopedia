const API_BASE = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

export function makeQuery(params) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            query.set(key, String(value));
        }
    });
    return query.toString();
}

export async function requestApi(path, query, signal) {
    if (!TOKEN) {
        throw new Error(
            "TMDB access is not configured. Add VITE_APP_TMDB_TOKEN to .env.local."
        );
    }

    const response = await fetch(
        `${API_BASE}${path}${query ? `?${query}` : ""}`,
        {
            headers: { Authorization: `Bearer ${TOKEN}` },
            signal,
        }
    );

    if (!response.ok) {
        throw new Error(`TMDB request failed (${response.status}).`);
    }

    return response.json();
}
