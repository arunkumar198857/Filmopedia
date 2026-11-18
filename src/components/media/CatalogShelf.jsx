import { useState } from "react";
import { useRequest } from "../../hooks/useTmdb";
import ErrorMessage from "../ui/ErrorMessage";
import { MediaShelfSkeleton } from "../ui/Skeletons";
import MediaCard from "./MediaCard";

export default function CatalogShelf({ title, category, switchable = false }) {
    const [mediaType, setMediaType] = useState("movie");
    const [period, setPeriod] = useState("day");
    const endpoint =
        category === "trending"
            ? `/trending/movie/${period}`
            : `/${mediaType}/${category}`;
    const { data, loading, error } = useRequest(endpoint);

    return (
        <section className="content-section">
            <div className="section-heading section-heading-controls">
                <div>
                    <h2>{title}</h2>
                    <span>Find a story worth settling in for</span>
                </div>
                <div className="segmented-control" aria-label={`${title} options`}>
                    {category === "trending" ? (
                        ["day", "week"].map((value) => (
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
                        ["movie", "tv"].map((value) => (
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
                    {(data?.results ?? []).slice(0, 16).map((item) => (
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
