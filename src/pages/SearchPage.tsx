import { useParams } from "react-router-dom";
import { usePagedResults } from "../hooks/useTmdb";
import ErrorMessage from "../components/ui/ErrorMessage";
import LoadMore from "../components/media/LoadMore";
import ResultsGrid, { ResultsGridSkeleton } from "../components/media/ResultsGrid";
import type { MediaItem } from "../types/tmdb";
import "./ListingPage.css";

interface SearchRouteParams {
    [key: string]: string | undefined;
    query: string;
}

export default function SearchPage(): JSX.Element {
    const { query = "" } = useParams<SearchRouteParams>();
    const {
        results,
        loading,
        loadingMore,
        error,
        hasMore,
        loadMore,
    } = usePagedResults("/search/multi", { query });
    const titles: MediaItem[] = results.filter(
        (item: MediaItem) => item.media_type === "movie" || item.media_type === "tv"
    );

    return (
        <main className="page-width listing-page">
            <p className="eyebrow">Search Filmopedia</p>
            <h1>Results for “{query}”</h1>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {loading ? (
                <ResultsGridSkeleton />
            ) : titles.length ? (
                <>
                    <ResultsGrid items={titles} loadingMore={loadingMore} />
                    <LoadMore
                        hasMore={hasMore}
                        loadingMore={loadingMore}
                        loadMore={loadMore}
                    />
                </>
            ) : (
                !error && <p className="notice">No matching films or shows. Try another search.</p>
            )}
        </main>
    );
}
