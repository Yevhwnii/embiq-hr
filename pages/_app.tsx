import { useEffect } from "react";
import { useRequest } from "ahooks";
import type { AppProps } from "next/app";

import { usePersistentStore, useStore } from "store";
import MainLayout from "layouts/MainLayout";
import { api } from "api";
import LoadingOverlay from "layouts/LoadingOverlay";
import "../styles/mixins.scss";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const cachedCurcuits = usePersistentStore((state) => state.cachedCurcuits);
  const updateCachedCurcuits = usePersistentStore(
    (state) => state.updateCachedCurcuits
  );
  const updateCurrentCurcuit = useStore((state) => state.updateCurrentCurcuit);

  const getCircuitsRequest = useRequest(api.getCircuits, {
    manual: true,
    onSuccess: ({ data }) => {
      updateCachedCurcuits(data.response);
      updateCurrentCurcuit(data.response[0]);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    if (!cachedCurcuits) getCircuitsRequest.run();
  }, []);

  let content;

  if (getCircuitsRequest.loading) {
    content = <LoadingOverlay />;
  } else {
    content = <Component {...pageProps} />;
  }

  return <MainLayout>{content}</MainLayout>;
}

export default MyApp;
