import { Link } from "react-router-dom";
import { imageUrl, titleOf, yearOf } from "../../utils/media";

export default function MediaCard({ item, mediaType }) {
    const kind = item.media_type || mediaType || "movie";
    const poster = imageUrl(item.poster_path);
    const rating = Number(item.vote_average);

    return (
        <Link className="media-card" to={`/${kind}/${item.id}`}>
            <div className="poster-frame">
                {poster ? (
                    <img src={poster} alt={`Poster for ${titleOf(item)}`} loading="lazy" />
                ) : (
                    <div className="poster-placeholder" aria-label="No poster available">
                        <span>{titleOf(item).slice(0, 1)}</span>
                        <small>Artwork unavailable</small>
                    </div>
                )}
                {Number.isFinite(rating) && rating > 0 && (
                    <span className="rating-badge">{rating.toFixed(1)}</span>
                )}
            </div>
            <span className="card-title">{titleOf(item)}</span>
            <span className="card-meta">
                {kind === "tv" ? "TV" : "Film"} · {yearOf(item.release_date || item.first_air_date)}
            </span>
        </Link>
    );
}
