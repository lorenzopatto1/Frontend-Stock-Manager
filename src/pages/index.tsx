import { useEffect } from "react";
import { LandingPage } from "../components/LandingPage";

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Head from "next/head";

const Home = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  useEffect(() => {

    if (token !== undefined) {
      router.push("/dashboard")
    }
  }, [])

  return (
    <>
      <Head>
        <title>PDV - entre ou cadastre-se</title>
      </Head>
      <LandingPage />
    </>
  )
}

export default Home;