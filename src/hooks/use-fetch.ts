import type { ApiResponse } from "@/types/api-response.types";
import { useCallback, useEffect, useState, type DependencyList } from "react";

interface RequestState<T> {
  loading: boolean;
  error: boolean;
  response: ApiResponse<T> | null;
  message: string;
  errorMessage: string;
}

const createInitialState = <T,>(): RequestState<T> => ({
  loading: false,
  error: false,
  response: null,
  message: "",
  errorMessage: "",
});

interface FetchOptions<T> {
  /** If true, runs automatically on mount or dependency change */
  auto?: boolean;
  /** Dependencies that trigger auto execution */
  dependencies?: DependencyList;
  /** Arguments for auto execution (passed to service) */
  params?: any[];
  /** Callback when request succeeds */
  onSuccess?: (response: ApiResponse<T>) => void;
  /** Callback when request fails */
  onError?: (error: any) => void;
  onFinish?: () => void;
}

/**
 * A foolproof useFetch hook that supports:
 * - manual or auto execution
 * - dependency-based re-fetching
 * - params for GET requests
 * - onSuccess and onError callbacks
 */
export default function useFetch<T>(
  service: (...args: any[]) => Promise<ApiResponse<T>>,
  {
    auto = false,
    dependencies = [],
    params = [],
    onSuccess,
    onError,
    onFinish,
  }: FetchOptions<T> = {}
) {
  const [state, setState] = useState<RequestState<T>>(createInitialState);

const [refreshKey, setRefreshKey] = useState(0);


  const execute = useCallback(
    async (...args: any[]) => {
      setState({ ...createInitialState<T>(), loading: true });

      try {
        const response = await service(...args);
        setState({ ...createInitialState<T>(), response });
        onSuccess?.(response);
        return response;
      } catch (error: any) {
        console.error("useFetch error:", error);
        setState({
          ...createInitialState<T>(),
          error: true,
          errorMessage: error?.message || "Something went wrong",
        });
        onError?.(error);
        throw error;
      } finally {
        onFinish?.();
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [service] // dependencies inside callback
  );

  // Auto execution
  useEffect(() => {
    if (auto) {
      execute(...params);
    }
  }, [auto, execute, refreshKey, ...dependencies]);

  return {
    ...state,
    execute,
    isLoading: state.loading,
    isError: state.error,
    data: state.response?.data,
    refresh: () => setRefreshKey((prev) => prev + 1),
  };
}
