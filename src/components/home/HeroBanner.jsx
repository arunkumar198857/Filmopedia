import { useRequest } from "../../hooks/useTmdb";
import { imageUrl } from "../../utils/media";
import { SkeletonBlock } from "../ui/Skeletons";
import SearchForm from "../search/SearchForm";

export default function HeroBanner() {
    const { data, loading, error } = useRequest("/movie/upcoming");
    const featured = data?.results?.find((item) => item.backdrop_path);

    return (
        <section
            className={`hero${loading ? " hero-loading" : ""}`}
            style={{
                "--hero-image": featured?.backdrop_path
                    ? `url("${imageUrl(featured.backdrop_path, "w1280")}")`
                    : "none",
            }}
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
