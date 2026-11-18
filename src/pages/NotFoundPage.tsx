import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <main className="page-width listing-page not-found">
            <p className="eyebrow">Nothing on this reel</p>
            <h1>We couldn&apos;t find that page.</h1>
            <Link className="button-link" to="/">Back to Filmopedia</Link>
        </main>
    );
}
