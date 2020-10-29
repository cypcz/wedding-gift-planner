import { useWeddingQuery } from "@codegen/generated/graphql";
import Logo from "@components/Icons/Logo";
import PrivateRoute from "@components/PrivateRoute";
import GiftForm from "@containers/Gifts/form";
import { Routes } from "@utils/constants";
import Head from "next/head";
import { useRouter } from "next/router";

const NewGiftPage = () => {
  const router = useRouter();
  const { data, loading } = useWeddingQuery();

  if (loading) {
    return <Logo className="animate-ping" />;
  }

  if (!data?.wedding) {
    router.replace(Routes.WEDDING.path);
    return <Logo className="animate-ping" />;
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
