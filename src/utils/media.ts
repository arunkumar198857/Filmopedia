const IMAGE_BASE = "https://image.tmdb.org/t/p/";

export function titleOf(item) {
    return item.title || item.name || "Untitled";
}

export function yearOf(date) {
    return date?.slice(0, 4) || "Year unavailable";
}

export function imageUrl(path, size = "w500") {
    return path ? `${IMAGE_BASE}${size}${path}` : "";
}
