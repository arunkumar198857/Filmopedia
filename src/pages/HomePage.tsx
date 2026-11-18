import CatalogShelf from "../components/media/CatalogShelf";
import HeroBanner from "../components/home/HeroBanner";

export default function HomePage() {
    return (
        <>
            <HeroBanner />
            <main className="page-width home-content">
                <CatalogShelf title="Trending now" category="trending" />
                <CatalogShelf title="Popular picks" category="popular" switchable />
                <CatalogShelf title="Critics&apos; favorites" category="top_rated" switchable />
            </main>
        </>
    );
}
