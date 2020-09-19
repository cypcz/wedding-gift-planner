import { useGuestsQuery, useWeddingQuery } from "@codegen/generated/graphql";
import PrivateRoute from "@components/PrivateRoute";
import Guests from "@containers/Guests";
import Head from "next/head";
import { useRouter } from "next/router";

const GuestsPage = () => {
  const router = useRouter();
  const { data: weddingData, loading: weddingLoading } = useWeddingQuery();
  const { data, loading } = useGuestsQuery();

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
        <title>Wedding guests - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PrivateRoute>
        <Guests guests={data?.guests} />
      </PrivateRoute>
    </>
  );
};

export default GuestsPage;
