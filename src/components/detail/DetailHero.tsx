import type { CSSProperties } from "react";
import { imageUrl, titleOf, yearOf } from "../../utils/media";
import type { CrewMember, Genre, MediaDetails, MediaType, Video } from "../../types/tmdb";

interface DetailHeroProps {
    item: MediaDetails;
    mediaType: MediaType;
    creators: CrewMember[];
    trailer?: Video;
}

export default function DetailHero({ item, mediaType, creators, trailer }: DetailHeroProps): JSX.Element {
    const runtime: string = item.runtime
        ? `${Math.floor(item.runtime / 60)}h ${item.runtime % 60}m`
        : "";
    const heroStyle: CSSProperties & { "--detail-image": string } = {
        "--detail-image": item.backdrop_path
            ? `url("${imageUrl(item.backdrop_path, "w1280")}")`
            : "none",
    };

    return (
        <section
            className="detail-hero"
            style={heroStyle}
        >
            <div className="page-width detail-layout">
                <div className="detail-poster">
                    {item.poster_path ? (
                        <img src={imageUrl(item.poster_path, "w500")} alt={`Poster for ${titleOf(item)}`} />
                    ) : (
                        <div className="poster-placeholder"><span>{titleOf(item).slice(0, 1)}</span></div>
                    )}
                </div>
                <div className="detail-copy">
                    <p className="eyebrow">{mediaType === "tv" ? "TV series" : "Feature film"}</p>
                    <h1>{titleOf(item)} <span>({yearOf(item.release_date || item.first_air_date)})</span></h1>
                    {item.tagline && <p className="detail-tagline">{item.tagline}</p>}
                    <div className="detail-facts">
                        {typeof item.vote_average === "number" && item.vote_average > 0 && <span>★ {item.vote_average.toFixed(1)} / 10</span>}
                        {item.status && <span>{item.status}</span>}
                        {runtime && <span>{runtime}</span>}
                        {item.genres?.map((genre: Genre) => <span key={genre.id}>{genre.name}</span>)}
                    </div>
                    <h2>Overview</h2>
                    <p className="overview-copy">{item.overview || "No overview is available for this title."}</p>
                    {creators.length > 0 && (
                        <p className="credits-line">
                            <strong>Credits:</strong>{" "}
                            {creators.map((person: CrewMember) => `${person.name} (${person.job})`).join(" · ")}
                        </p>
                    )}
                    {trailer && (
                        <a
                            className="button-link"
                            href={`https://www.youtube.com/watch?v=${encodeURIComponent(trailer.key)}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Watch trailer
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}
