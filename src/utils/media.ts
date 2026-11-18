import type { MediaItem } from "../types/tmdb";

const IMAGE_BASE: string = "https://image.tmdb.org/t/p/";

export function titleOf(item: Pick<MediaItem, "title" | "name">): string {
    const title: string = item.title || item.name || "Untitled";
    return title;
}

export function yearOf(date: string | null | undefined): string {
    return date?.slice(0, 4) || "Year unavailable";
}

export function imageUrl(
    path: string | null | undefined,
    size: string = "w500"
): string {
    return path ? `${IMAGE_BASE}${size}${path}` : "";
}
