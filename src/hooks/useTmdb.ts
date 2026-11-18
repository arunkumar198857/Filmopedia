import { useCallback, useEffect, useRef, useState } from "react";
import { makeQuery, requestApi } from "../api/tmdb";

export function useRequest(path, params = {}) {
    const query = makeQuery(params);
    const [state, setState] = useState({
        data: null,
        loading: true,
        error: "",
    });

    useEffect(() => {
        const controller = new AbortController();
        setState({ data: null, loading: true, error: "" });

        requestApi(path, query, controller.signal)
            .then((data) => setState({ data, loading: false, error: "" }))
            .catch((error) => {
                if (error.name !== "AbortError") {
                    setState({
                        data: null,
                        loading: false,
                        error: error.message,
                    });
                }
            });

        return () => controller.abort();
    }, [path, query]);

    return state;
}

export function usePagedResults(path, params = {}) {
    const query = makeQuery(params);
    const requestId = useRef(0);
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const currentRequest = ++requestId.current;
        const controller = new AbortController();
        setResults([]);
        setPage(1);
        setTotalPages(1);
        setLoading(true);
        setLoadingMore(false);
        setError("");

        requestApi(path, query, controller.signal)
            .then((data) => {
                if (currentRequest !== requestId.current) return;
                setResults(data.results ?? []);
                setTotalPages(data.total_pages ?? 1);
                setLoading(false);
            })
            .catch((requestError) => {
                if (
                    requestError.name !== "AbortError" &&
                    currentRequest === requestId.current
                ) {
                    setError(requestError.message);
                    setLoading(false);
                }
            });

        return () => {
            controller.abort();
            if (requestId.current === currentRequest) requestId.current += 1;
        };
    }, [path, query]);

    const loadMore = useCallback(async () => {
        if (loading || loadingMore || page >= totalPages) return;

        const currentRequest = requestId.current;
        const nextPage = page + 1;
        setLoadingMore(true);
        setError("");

        try {
            const nextQuery = makeQuery({
                ...Object.fromEntries(new URLSearchParams(query)),
                page: nextPage,
            });
            const data = await requestApi(path, nextQuery);
            if (currentRequest !== requestId.current) return;
            setResults((current) => [...current, ...(data.results ?? [])]);
            setPage(nextPage);
            setTotalPages(data.total_pages ?? totalPages);
        } catch (requestError) {
            if (
                requestError.name !== "AbortError" &&
                currentRequest === requestId.current
            ) {
                setError(requestError.message);
            }
        } finally {
            if (currentRequest === requestId.current) setLoadingMore(false);
        }
    }, [loading, loadingMore, page, path, query, totalPages]);

    return {
        results,
        loading,
        loadingMore,
        error,
        hasMore: page < totalPages,
        loadMore,
    };
}
