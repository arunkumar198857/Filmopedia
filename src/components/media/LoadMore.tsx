import { SkeletonBlock } from "../ui/Skeletons";

interface LoadMoreProps {
    hasMore: boolean;
    loadingMore: boolean;
    loadMore: () => Promise<void>;
}

export default function LoadMore({ hasMore, loadingMore, loadMore }: LoadMoreProps): JSX.Element | null {
    if (!hasMore) return null;
    return (
        <button className="load-more" type="button" onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? (
                <>
                    <span className="visually-hidden">Loading more titles</span>
                    <SkeletonBlock className="button-skeleton" />
                </>
            ) : "Load more"}
        </button>
    );
}
