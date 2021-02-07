import { useWeddingQuery } from "@codegen/generated/graphql";
import Logo from "@components/Icons/Logo";
import PrivateRoute from "@components/PrivateRoute";
import Wedding from "@containers/Wedding";
import Head from "next/head";

const WeddingPage = () => {
  const { data, loading } = useWeddingQuery();

  if (loading) {
    return <Logo />;
  }

  return (
    <>
      <Head>
        <title>Wedding - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PrivateRoute>
        <Wedding wedding={data?.wedding} />
      </PrivateRoute>
    </>
  );
};

export default WeddingPage;
