import { useCallback, useEffect, useRef, useState } from "react";
import { makeQuery, requestApi } from "../api/tmdb";
import type { MediaItem, PagedResponse, QueryParams } from "../types/tmdb";

export interface RequestState<T> {
    data: T | null;
    loading: boolean;
    error: string;
}

export interface PagedResultsState {
    results: MediaItem[];
    loading: boolean;
    loadingMore: boolean;
    error: string;
    hasMore: boolean;
    loadMore: () => Promise<void>;
}

function isAbortError(error: unknown): boolean {
    return error instanceof Error && error.name === "AbortError";
}

function errorMessage(error: unknown): string {
    return error instanceof Error ? error.message : "An unexpected request error occurred.";
}

export function useRequest<T>(path: string, params: QueryParams = {}): RequestState<T> {
    const query: string = makeQuery(params);
    const [state, setState] = useState<RequestState<T>>({
        data: null,
        loading: true,
        error: "",
    });

    useEffect((): (() => void) => {
        const controller: AbortController = new AbortController();
        setState({ data: null, loading: true, error: "" });

        requestApi<T>(path, query, controller.signal)
            .then((data: T) => setState({ data, loading: false, error: "" }))
            .catch((error: unknown) => {
                if (!isAbortError(error)) {
                    setState({
                        data: null,
                        loading: false,
                        error: errorMessage(error),
                    });
                }
            });

        return () => controller.abort();
    }, [path, query]);

    return state;
}

export function usePagedResults(path: string, params: QueryParams = {}): PagedResultsState {
    const query: string = makeQuery(params);
    const requestId = useRef<number>(0);
    const [results, setResults] = useState<MediaItem[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect((): (() => void) => {
        const currentRequest: number = ++requestId.current;
        const controller: AbortController = new AbortController();
        setResults([]);
        setPage(1);
        setTotalPages(1);
        setLoading(true);
        setLoadingMore(false);
        setError("");

        requestApi<PagedResponse<MediaItem>>(path, query, controller.signal)
            .then((data: PagedResponse<MediaItem>) => {
                if (currentRequest !== requestId.current) return;
                setResults(data.results ?? []);
                setTotalPages(data.total_pages ?? 1);
                setLoading(false);
            })
            .catch((requestError: unknown) => {
                if (
                    !isAbortError(requestError) &&
                    currentRequest === requestId.current
                ) {
                    setError(errorMessage(requestError));
                    setLoading(false);
                }
            });

        return () => {
            controller.abort();
            if (requestId.current === currentRequest) requestId.current += 1;
        };
    }, [path, query]);

    const loadMore = useCallback(async (): Promise<void> => {
        if (loading || loadingMore || page >= totalPages) return;

        const currentRequest: number = requestId.current;
        const nextPage: number = page + 1;
        setLoadingMore(true);
        setError("");

        try {
            const nextQuery: string = makeQuery({
                ...Object.fromEntries(new URLSearchParams(query)),
                page: nextPage,
            });
            const data: PagedResponse<MediaItem> = await requestApi<PagedResponse<MediaItem>>(path, nextQuery);
            if (currentRequest !== requestId.current) return;
            setResults((current: MediaItem[]): MediaItem[] => [...current, ...(data.results ?? [])]);
            setPage(nextPage);
            setTotalPages(data.total_pages ?? totalPages);
        } catch (requestError: unknown) {
            if (
                !isAbortError(requestError) &&
                currentRequest === requestId.current
            ) {
                setError(errorMessage(requestError));
            }
        } finally {
            if (currentRequest === requestId.current) setLoadingMore(false);
        }
    }, [loading, loadingMore, page, path, query, totalPages]);

    const state: PagedResultsState = {
        results,
        loading,
        loadingMore,
        error,
        hasMore: page < totalPages,
        loadMore,
    };
    return state;
}
