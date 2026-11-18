export type MediaType = "movie" | "tv";

export interface Genre {
    id: number;
    name: string;
}

export interface SortOption {
    value: string;
    label: string;
}

export interface MediaItem {
    id: number;
    media_type?: MediaType;
    title?: string;
    name?: string;
    poster_path?: string | null;
    backdrop_path?: string | null;
    release_date?: string;
    first_air_date?: string;
    vote_average?: number;
    overview?: string;
}

export interface MediaDetails extends MediaItem {
    tagline?: string;
    status?: string;
    runtime?: number | null;
    genres?: Genre[];
}

export interface CastMember {
    id: number;
    name: string;
    character?: string;
    profile_path?: string | null;
}

export interface CrewMember {
    id: number;
    name: string;
    job: string;
}

export interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
}

export interface PagedResponse<T> {
    results?: T[];
    total_pages?: number;
}

export interface GenreResponse {
    genres?: Genre[];
}

export interface CreditsResponse {
    cast?: CastMember[];
    crew?: CrewMember[];
}

export interface VideosResponse {
    results?: Video[];
}

export interface QueryParams {
    [key: string]: string | number | boolean | null | undefined;
}
