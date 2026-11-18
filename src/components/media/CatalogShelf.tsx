import { useState } from "react";
import { useRequest } from "../../hooks/useTmdb";
import ErrorMessage from "../ui/ErrorMessage";
import { MediaShelfSkeleton } from "../ui/Skeletons";
import MediaCard from "./MediaCard";
import type { MediaItem, MediaType, PagedResponse } from "../../types/tmdb";

type CatalogCategory = "trending" | "popular" | "top_rated";

interface CatalogShelfProps {
    title: string;
    category: CatalogCategory;
    switchable?: boolean;
}

export default function CatalogShelf({ title, category, switchable = false }: CatalogShelfProps): JSX.Element {
    const [mediaType, setMediaType] = useState<MediaType>("movie");
    const [period, setPeriod] = useState<"day" | "week">("day");
    const endpoint: string =
        category === "trending"
            ? `/trending/movie/${period}`
            : `/${mediaType}/${category}`;
    const { data, loading, error } = useRequest<PagedResponse<MediaItem>>(endpoint);

    return (
        <section className="content-section">
            <div className="section-heading section-heading-controls">
                <div>
                    <h2>{title}</h2>
                    <span>Find a story worth settling in for</span>
                </div>
                <div className="segmented-control" aria-label={`${title} options`}>
                    {category === "trending" ? (
                        (["day", "week"] as const).map((value: "day" | "week") => (
                            <button
                                key={value}
                                type="button"
                                className={period === value ? "selected" : ""}
                                onClick={() => setPeriod(value)}
                            >
                                {value === "day" ? "Today" : "This week"}
                            </button>
                        ))
                    ) : switchable ? (
                        (["movie", "tv"] as const).map((value: MediaType) => (
                            <button
                                key={value}
                                type="button"
                                className={mediaType === value ? "selected" : ""}
                                onClick={() => setMediaType(value)}
                            >
                                {value === "movie" ? "Movies" : "TV"}
                            </button>
                        ))
                    ) : null}
                </div>
            </div>
            {error ? (
                <ErrorMessage>{error}</ErrorMessage>
            ) : loading ? (
                <MediaShelfSkeleton />
            ) : (
                <div className="media-shelf">
                    {(data?.results ?? []).slice(0, 16).map((item: MediaItem) => (
                        <MediaCard
                            key={`${item.media_type || mediaType}-${item.id}`}
                            item={item}
                            mediaType={mediaType}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
