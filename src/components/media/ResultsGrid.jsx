import MediaCard from "./MediaCard";
import { MediaCardSkeleton, ResultsGridSkeleton } from "../ui/Skeletons";

export { ResultsGridSkeleton };

export default function ResultsGrid({ items, mediaType, loadingMore = false }) {
    return (
        <div className="results-grid" aria-busy={loadingMore}>
            {items.map((item) => (
                <MediaCard
                    key={`${item.media_type || mediaType}-${item.id}`}
                    item={item}
                    mediaType={mediaType}
                />
            ))}
            {loadingMore && (
                <>
                    <span className="visually-hidden" role="status">Loading more titles</span>
                    {Array.from({ length: 4 }, (_, index) => (
                        <MediaCardSkeleton key={`loading-${index}`} />
                    ))}
                </>
            )}
        </div>
    );
}
