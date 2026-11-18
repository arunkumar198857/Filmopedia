import ErrorMessage from "../ui/ErrorMessage";
import { MediaShelfSkeleton } from "../ui/Skeletons";
import MediaCard from "./MediaCard";

export default function MediaShelf({ title, items, mediaType, loading, error }) {
    return (
        <section className="content-section">
            <div className="section-heading">
                <h2>{title}</h2>
                <span>Handpicked for your next watch</span>
            </div>
            {error ? (
                <ErrorMessage>{error}</ErrorMessage>
            ) : loading ? (
                <MediaShelfSkeleton />
            ) : items?.length ? (
                <div className="media-shelf">
                    {items.slice(0, 16).map((item) => (
                        <MediaCard
                            key={`${item.media_type || mediaType}-${item.id}`}
                            item={item}
                            mediaType={mediaType}
                        />
                    ))}
                </div>
            ) : (
                <p className="notice">No titles are available right now.</p>
            )}
        </section>
    );
}
