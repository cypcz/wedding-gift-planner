import { useGiftsQuery, useWeddingQuery } from "@codegen/generated/graphql";
import Logo from "@components/Icons/Logo";
import PrivateRoute from "@components/PrivateRoute";
import Gifts from "@containers/Gifts";
import { Routes } from "@utils/constants";
import Head from "next/head";
import { useRouter } from "next/router";

const GiftsPage = () => {
  const router = useRouter();
  const { data: weddingData, loading: weddingLoading } = useWeddingQuery();
  const { data, loading } = useGiftsQuery();

  if (weddingLoading || loading) {
    return <Logo className="animate-ping" />;
  }

  if (!weddingData?.wedding) {
    router.replace(Routes.WEDDING.path);
    return <Logo className="animate-ping" />;
  }

  return (
    <>
      <Head>
        <title>Wedding gifts - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PrivateRoute>
        <Gifts gifts={data?.gifts} />
      </PrivateRoute>
    </>
  );
};

export default GiftsPage;
