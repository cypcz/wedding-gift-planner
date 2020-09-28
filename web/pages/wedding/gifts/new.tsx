import { useWeddingQuery } from "@codegen/generated/graphql";
import PrivateRoute from "@components/PrivateRoute";
import GiftForm from "@containers/Gifts/form";
import Head from "next/head";
import { useRouter } from "next/router";

const NewGiftPage = () => {
  const router = useRouter();
  const { data, loading } = useWeddingQuery();

  if (loading) {
    return <>loading...</>;
  }

  if (!data?.wedding) {
    router.replace("/wedding");
    return <></>;
  }

  return (
    <>
      <Head>
        <title>New Gift - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PrivateRoute>
        <GiftForm wedding={data.wedding} router={router} />
      </PrivateRoute>
    </>
  );
};

export default NewGiftPage;
