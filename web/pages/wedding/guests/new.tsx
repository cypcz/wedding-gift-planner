import { useWeddingQuery } from "@codegen/generated/graphql";
import Logo from "@components/Icons/Logo";
import PrivateRoute from "@components/PrivateRoute";
import GuestForm from "@containers/Guests/form";
import { Routes } from "@utils/constants";
import Head from "next/head";
import { useRouter } from "next/router";

const NewGuestPage = () => {
  const router = useRouter();
  const { data, loading } = useWeddingQuery();

  if (loading) {
    return <Logo />;
  }

  if (!data?.wedding) {
    router.replace(Routes.WEDDING.path);
    return <Logo />;
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
