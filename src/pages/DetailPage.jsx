import { useParams } from "react-router-dom";
import { useRequest } from "../hooks/useTmdb";
import CastSection from "../components/detail/CastSection";
import DetailHero from "../components/detail/DetailHero";
import VideosSection from "../components/detail/VideosSection";
import MediaShelf from "../components/media/MediaShelf";
import ErrorMessage from "../components/ui/ErrorMessage";
import NotFoundPage from "./NotFoundPage";
import DetailSkeleton from "./details/DetailSkeleton";

export default function DetailPage() {
    const { mediaType: routeType, id } = useParams();
    const mediaType = routeType === "tv" ? "tv" : "movie";
    const detail = useRequest(`/${mediaType}/${id}`);
    const credits = useRequest(`/${mediaType}/${id}/credits`);
    const videos = useRequest(`/${mediaType}/${id}/videos`);
    const similar = useRequest(`/${mediaType}/${id}/similar`);
    const recommendations = useRequest(`/${mediaType}/${id}/recommendations`);

    if (routeType !== "movie" && routeType !== "tv") return <NotFoundPage />;
    if (detail.loading) return <DetailSkeleton />;
    if (detail.error) {
        return <main className="page-width listing-page"><ErrorMessage>{detail.error}</ErrorMessage></main>;
    }
    if (!detail.data) return <NotFoundPage />;

    const creators = credits.data?.crew?.filter((person) =>
        ["Director", "Writer", "Screenplay", "Story"].includes(person.job)
    ) ?? [];
    const trailer = videos.data?.results?.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
    );

    return (
        <main className="detail-page">
            <DetailHero
                item={detail.data}
                mediaType={mediaType}
                creators={creators}
                trailer={trailer}
            />
            <div className="page-width detail-sections">
                <CastSection
                    people={credits.data?.cast?.slice(0, 12) ?? []}
                    loading={credits.loading}
                    error={credits.error}
                />
                <VideosSection
                    videos={videos.data?.results}
                    loading={videos.loading}
                    error={videos.error}
                />
                <MediaShelf
                    title="More like this"
                    items={similar.data?.results}
                    mediaType={mediaType}
                    loading={similar.loading}
                    error={similar.error}
                />
                <MediaShelf
                    title="You might also like"
                    items={recommendations.data?.results}
                    mediaType={mediaType}
                    loading={recommendations.loading}
                    error={recommendations.error}
                />
            </div>
        </main>
    );
}
