import type { QueryParams } from "../types/tmdb";

const API_BASE: string = "https://api.themoviedb.org/3";
const TOKEN: string | undefined = import.meta.env.VITE_APP_TMDB_TOKEN;

export function makeQuery(params: QueryParams = {}): string {
    const query: URLSearchParams = new URLSearchParams();
    Object.entries(params).forEach(
        ([key, value]: [string, QueryParams[string]]): void => {
            if (value !== undefined && value !== null && value !== "") {
                query.set(key, String(value));
            }
        }
    );
    return query.toString();
}

export async function requestApi<T>(
    path: string,
    query: string = "",
    signal?: AbortSignal
): Promise<T> {
    if (!TOKEN) {
        throw new Error(
            "TMDB access is not configured. Add VITE_APP_TMDB_TOKEN to .env.local."
        );
    }

    const response: Response = await fetch(
        `${API_BASE}${path}${query ? `?${query}` : ""}`,
        {
            headers: { Authorization: `Bearer ${TOKEN}` },
            signal,
        }
    );

    if (!response.ok) {
        throw new Error(`TMDB request failed (${response.status}).`);
    }

    return (await response.json()) as T;
}
