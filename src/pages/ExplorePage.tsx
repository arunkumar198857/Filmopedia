import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePagedResults, useRequest } from "../hooks/useTmdb";
import ErrorMessage from "../components/ui/ErrorMessage";
import { SkeletonBlock } from "../components/ui/Skeletons";
import GenreMultiSelect from "../components/genres/GenreMultiSelect";
import SortBySelect from "../components/filters/SortBySelect";
import LoadMore from "../components/media/LoadMore";
import ResultsGrid, { ResultsGridSkeleton } from "../components/media/ResultsGrid";
import NotFoundPage from "./NotFoundPage";

const SORT_OPTIONS = [
    { value: "popularity.desc", label: "Most popular" },
    { value: "vote_average.desc", label: "Highest rated" },
    { value: "primary_release_date.desc", label: "Newest first" },
    { value: "primary_release_date.asc", label: "Oldest first" },
    { value: "original_title.asc", label: "Title A–Z" },
];

export default function ExplorePage() {
    const { mediaType: routeType = "movie" } = useParams();
    const mediaType = routeType === "tv" ? "tv" : "movie";
    const [sortBy, setSortBy] = useState("popularity.desc");
    const [genres, setGenres] = useState([]);
    const genreRequest = useRequest(`/genre/${mediaType}/list`);
    const results = usePagedResults(`/discover/${mediaType}`, {
        sort_by: sortBy,
        with_genres: genres.join(","),
    });

    if (routeType !== "movie" && routeType !== "tv") return <NotFoundPage />;

    return (
        <main className="page-width listing-page">
            <p className="eyebrow">Explore Filmopedia</p>
            <h1>{mediaType === "tv" ? "TV shows" : "Movies"} for every mood</h1>
            <div className="filter-bar">
                <SortBySelect
                    options={SORT_OPTIONS}
                    value={sortBy}
                    onChange={setSortBy}
                />
                {genreRequest.loading ? (
                    <div className="filter-loading" role="status" aria-label="Loading genres">
                        <span>Genres</span>
                        <SkeletonBlock className="genre-skeleton" />
                    </div>
                ) : (
                    <GenreMultiSelect
                        options={genreRequest.data?.genres ?? []}
                        value={genres}
                        onChange={setGenres}
                    />
                )}
            </div>
            {genreRequest.error && <ErrorMessage>{genreRequest.error}</ErrorMessage>}
            {results.error && <ErrorMessage>{results.error}</ErrorMessage>}
            {results.loading ? (
                <ResultsGridSkeleton />
            ) : results.results.length ? (
                <>
                    <ResultsGrid
                        items={results.results}
                        mediaType={mediaType}
                        loadingMore={results.loadingMore}
                    />
                    <LoadMore
                        hasMore={results.hasMore}
                        loadingMore={results.loadingMore}
                        loadMore={results.loadMore}
                    />
                </>
            ) : (
                !results.error && <p className="notice">No titles match these filters.</p>
            )}
        </main>
    );
}
