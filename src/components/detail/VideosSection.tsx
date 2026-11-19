import ErrorMessage from "../ui/ErrorMessage";
import { VideoListSkeleton } from "../ui/Skeletons";
import type { Video } from "../../types/tmdb";
import "./VideosSection.scss";

interface VideosSectionProps {
    videos?: Video[];
    loading: boolean;
    error: string;
}

export default function VideosSection({ videos, loading, error }: VideosSectionProps): JSX.Element {
    return (
        <section className="content-section">
            <div className="section-heading"><h2>Videos</h2></div>
            {error ? <ErrorMessage>{error}</ErrorMessage> : loading ? <VideoListSkeleton /> : (
                videos?.length ? (
                    <div className="video-list">
                        {videos.slice(0, 6).map((video: Video) => (
                            <a
                                key={video.id}
                                href={`https://www.youtube.com/watch?v=${encodeURIComponent(video.key)}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span aria-hidden="true">▶</span>
                                <span>{video.name}</span>
                                <small>{video.type}</small>
                            </a>
                        ))}
                    </div>
                ) : <p className="notice">No videos are available for this title.</p>
            )}
        </section>
    );
}
