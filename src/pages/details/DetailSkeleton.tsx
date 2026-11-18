import {
    CastSkeleton,
    MediaShelfSkeleton,
    SkeletonBlock,
    VideoListSkeleton,
} from "../../components/ui/Skeletons";

export default function DetailSkeleton(): JSX.Element {
    return (
        <main className="detail-page" aria-busy="true">
            <span className="visually-hidden" role="status">Loading title details</span>
            <section className="detail-hero">
                <div className="page-width detail-layout">
                    <SkeletonBlock className="detail-poster detail-poster-skeleton" />
                    <div className="detail-copy detail-copy-skeleton">
                        <SkeletonBlock className="skeleton-line detail-eyebrow-skeleton" />
                        <SkeletonBlock className="skeleton-line detail-title-skeleton" />
                        <SkeletonBlock className="skeleton-line detail-subtitle-skeleton" />
                        <div className="detail-facts">
                            <SkeletonBlock className="skeleton-chip" />
                            <SkeletonBlock className="skeleton-chip" />
                            <SkeletonBlock className="skeleton-chip" />
                        </div>
                        <SkeletonBlock className="skeleton-line detail-section-title-skeleton" />
                        <SkeletonBlock className="skeleton-line detail-description-skeleton" />
                        <SkeletonBlock className="skeleton-line detail-description-skeleton short" />
                        <SkeletonBlock className="skeleton-line detail-button-skeleton" />
                    </div>
                </div>
            </section>
            <div className="page-width detail-sections">
                <section className="content-section">
                    <div className="section-heading"><h2>Cast</h2></div>
                    <CastSkeleton />
                </section>
                <section className="content-section">
                    <div className="section-heading"><h2>Videos</h2></div>
                    <VideoListSkeleton />
                </section>
                <section className="content-section">
                    <div className="section-heading"><h2>More like this</h2></div>
                    <MediaShelfSkeleton />
                </section>
                <section className="content-section">
                    <div className="section-heading"><h2>You might also like</h2></div>
                    <MediaShelfSkeleton />
                </section>
            </div>
        </main>
    );
}
