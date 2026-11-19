import type { CSSProperties } from "react";
import { useRequest } from "../../hooks/useTmdb";
import { imageUrl } from "../../utils/media";
import { SkeletonBlock } from "../ui/Skeletons";
import SearchForm from "../search/SearchForm";
import type { MediaItem, PagedResponse } from "../../types/tmdb";
import "./HeroBanner.css";

export default function HeroBanner(): JSX.Element {
    const { data, loading, error } = useRequest<PagedResponse<MediaItem>>("/movie/upcoming");
    const featured: MediaItem | undefined = data?.results?.find(
        (item: MediaItem) => item.backdrop_path
    );
    const heroStyle: CSSProperties & { "--hero-image": string } = {
        "--hero-image": featured?.backdrop_path
            ? `url("${imageUrl(featured.backdrop_path, "w1280")}")`
            : "none",
    };

    return (
        <section
            className={`hero${loading ? " hero-loading" : ""}`}
            style={heroStyle}
        >
            <div className="page-width hero-content">
                <p className="eyebrow">A better movie night starts here</p>
                <h1>Find your next <em>favorite.</em></h1>
                <p className="hero-copy">
                    Explore memorable films and series, see what is trending,
                    and get to know the people behind every story.
                </p>
                <SearchForm />
                {loading && <SkeletonBlock className="hero-status-skeleton" />}
                {error && <span className="hero-status">{error}</span>}
            </div>
        </section>
    );
}
