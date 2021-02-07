import { useGuestsQuery, useWeddingQuery } from "@codegen/generated/graphql";
import Logo from "@components/Icons/Logo";
import PrivateRoute from "@components/PrivateRoute";
import Guests from "@containers/Guests";
import { Routes } from "@utils/constants";
import Head from "next/head";
import { useRouter } from "next/router";

const GuestsPage = () => {
  const router = useRouter();
  const { data: weddingData, loading: weddingLoading } = useWeddingQuery();
  const { data, loading } = useGuestsQuery();

  if (weddingLoading || loading) {
    return <Logo />;
  }

  if (!weddingData?.wedding) {
    router.replace(Routes.WEDDING.path);
    return <Logo />;
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
