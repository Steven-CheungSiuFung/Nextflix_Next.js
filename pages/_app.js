import "../styles/globals.css";

import { getMagicClient } from "../lib/magic-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Loading from "../components/loading/loading.component";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const magic = await getMagicClient();
      const isLoggedIn = await magic.user.isLoggedIn();
      if (!isLoggedIn) {
        router.push("/login");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log("get auth state error", error);
    }
  };

  const setRouterEventListener = () => {
    router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });

    return router.events.off("routeChangeComplete");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    setRouterEventListener();
  }, []);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
