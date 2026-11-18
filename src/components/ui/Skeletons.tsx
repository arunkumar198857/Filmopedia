interface SkeletonBlockProps {
    className?: string;
}

interface SkeletonProps {
    count?: number;
}

export function SkeletonBlock({ className = "" }: SkeletonBlockProps): JSX.Element {
    return <span className={`skeleton-block ${className}`} aria-hidden="true" />;
}

export function MediaCardSkeleton(): JSX.Element {
    return (
        <div className="media-card-skeleton" aria-hidden="true">
            <SkeletonBlock className="poster-skeleton" />
            <SkeletonBlock className="skeleton-line skeleton-title" />
            <SkeletonBlock className="skeleton-line skeleton-meta" />
        </div>
    );
}

export function MediaShelfSkeleton({ count = 6 }: SkeletonProps): JSX.Element {
    return (
        <div className="media-shelf" role="status" aria-label="Loading titles">
            {Array.from({ length: count }, (_: unknown, index: number) => (
                <MediaCardSkeleton key={index} />
            ))}
        </div>
    );
}

export function ResultsGridSkeleton({ count = 10 }: SkeletonProps): JSX.Element {
    return (
        <div className="results-grid" role="status" aria-label="Loading results">
            {Array.from({ length: count }, (_: unknown, index: number) => (
                <MediaCardSkeleton key={index} />
            ))}
        </div>
    );
}

export function CastSkeleton(): JSX.Element {
    return (
        <div className="cast-grid cast-skeleton-grid" role="status" aria-label="Loading cast">
            {Array.from({ length: 6 }, (_: unknown, index: number) => (
                <div className="cast-skeleton-card" key={index} aria-hidden="true">
                    <SkeletonBlock className="cast-avatar-skeleton" />
                    <SkeletonBlock className="skeleton-line skeleton-cast-name" />
                    <SkeletonBlock className="skeleton-line skeleton-cast-role" />
                </div>
            ))}
        </div>
    );
}

export function VideoListSkeleton(): JSX.Element {
    return (
        <div className="video-list video-skeleton-list" role="status" aria-label="Loading videos">
            {Array.from({ length: 4 }, (_: unknown, index: number) => (
                <div className="video-skeleton-item" key={index} aria-hidden="true">
                    <SkeletonBlock className="video-play-skeleton" />
                    <SkeletonBlock className="skeleton-line video-title-skeleton" />
                    <SkeletonBlock className="skeleton-line video-type-skeleton" />
                </div>
            ))}
        </div>
    );
}
