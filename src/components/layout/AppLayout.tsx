import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import type { Location as RouteLocation } from "react-router-dom";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import DetailPage from "../../pages/DetailPage";
import ExplorePage from "../../pages/ExplorePage";
import HomePage from "../../pages/HomePage";
import NotFoundPage from "../../pages/NotFoundPage";
import SearchPage from "../../pages/SearchPage";

export default function AppLayout(): JSX.Element {
    const location: RouteLocation = useLocation();

    useEffect((): void => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <>
            <SiteHeader />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search/:query" element={<SearchPage />} />
                <Route path="/explore/:mediaType" element={<ExplorePage />} />
                <Route path="/:mediaType/:id" element={<DetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <SiteFooter />
        </>
    );
}
