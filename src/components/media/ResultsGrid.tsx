import MediaCard from "./MediaCard";
import { MediaCardSkeleton, ResultsGridSkeleton } from "../ui/Skeletons";
import type { MediaItem, MediaType } from "../../types/tmdb";

export { ResultsGridSkeleton };

interface ResultsGridProps {
    items: MediaItem[];
    mediaType?: MediaType;
    loadingMore?: boolean;
}

export default function ResultsGrid({ items, mediaType = "movie", loadingMore = false }: ResultsGridProps): JSX.Element {
    return (
        <div className="results-grid" aria-busy={loadingMore}>
            {items.map((item: MediaItem) => (
                <MediaCard
                    key={`${item.media_type || mediaType}-${item.id}`}
                    item={item}
                    mediaType={mediaType}
                />
            ))}
            {loadingMore && (
                <>
                    <span className="visually-hidden" role="status">Loading more titles</span>
                    {Array.from({ length: 4 }, (_: unknown, index: number) => (
                        <MediaCardSkeleton key={`loading-${index}`} />
                    ))}
                </>
            )}
        </div>
    );
}
