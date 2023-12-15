"use client";
import "@/assets/styles/globals.css";
import "@/assets/styles/swiper.css";
import { img } from "@/data";
import { store } from "@/redux/store";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "leaflet/dist/leaflet.css";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

interface ProvderType {
  children: ReactNode;
}

const PageProvider = ({ children }: ProvderType) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const theme = createTheme({
    typography: {
      fontFamily: "IranSans",
    },
  });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CacheProvider value={cacheRtl}>
            <ToastContainer toastClassName="font-medium" rtl={true} />
            <div>{children}</div>
          </CacheProvider>
        </Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default PageProvider;
