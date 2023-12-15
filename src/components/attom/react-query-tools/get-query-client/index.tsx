import { QueryClient } from "react-query";
import { cache } from "react";

const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
};

export const getQueryClient = cache(() => new QueryClient(queryClientOptions));
