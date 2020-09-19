import { useGiftsQuery, useWeddingQuery } from "@codegen/generated/graphql";
import PrivateRoute from "@components/PrivateRoute";
import Gifts from "@containers/Gifts";
import Head from "next/head";
import { useRouter } from "next/router";

const GiftsPage = () => {
  const router = useRouter();
  const { data: weddingData, loading: weddingLoading } = useWeddingQuery();
  const { data, loading } = useGiftsQuery();

  if (weddingLoading || loading) {
    return <>loading...</>;
  }

  if (!weddingData?.wedding) {
    router.replace("/wedding");
    return <></>;
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
