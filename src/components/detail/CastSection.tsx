import { imageUrl } from "../../utils/media";
import ErrorMessage from "../ui/ErrorMessage";
import { CastSkeleton } from "../ui/Skeletons";
import type { CastMember } from "../../types/tmdb";

interface CastSectionProps {
    people: CastMember[];
    loading: boolean;
    error: string;
}

export default function CastSection({ people, loading, error }: CastSectionProps): JSX.Element {
    return (
        <section className="content-section">
            <div className="section-heading"><h2>Cast</h2></div>
            {error ? <ErrorMessage>{error}</ErrorMessage> : loading ? <CastSkeleton /> : (
                people.length ? (
                    <div className="cast-grid">
                        {people.map((person: CastMember) => (
                            <div className="cast-card" key={person.id}>
                                <div className="cast-avatar">
                                    {person.profile_path ? (
                                        <img src={imageUrl(person.profile_path, "w185")} alt="" loading="lazy" />
                                    ) : (
                                        <span>{person.name.slice(0, 1)}</span>
                                    )}
                                </div>
                                <strong>{person.name}</strong>
                                <span>{person.character || "Cast"}</span>
                            </div>
                        ))}
                    </div>
                ) : <p className="notice">Cast information is not available.</p>
            )}
        </section>
    );
}
