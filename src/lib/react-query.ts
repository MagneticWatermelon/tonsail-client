import { QueryClient, DefaultOptions } from '@tanstack/react-query';

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: (error: any) => error.response?.status != 401,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * (60 * 1000),
    cacheTime: 10 * (60 * 1000)
  }
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
