import { QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },

  queryCache: new QueryCache({
    onError: (error) => {
      console.error(error.message);
    },
  }),
});
