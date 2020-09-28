import { useWeddingQuery } from "@codegen/generated/graphql";
import PrivateRoute from "@components/PrivateRoute";
import GuestForm from "@containers/Guests/form";
import Head from "next/head";
import { useRouter } from "next/router";

const NewGuestPage = () => {
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
        <title>New Guest - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PrivateRoute>
        <GuestForm wedding={data.wedding} router={router} />
      </PrivateRoute>
    </>
  );
};

export default NewGuestPage;
