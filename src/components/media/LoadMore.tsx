import { SkeletonBlock } from "../ui/Skeletons";

export default function LoadMore({ hasMore, loadingMore, loadMore }) {
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
