import { useGiftLazyQuery, useWeddingQuery } from "@codegen/generated/graphql";
import Logo from "@components/Icons/Logo";
import PrivateRoute from "@components/PrivateRoute";
import GiftForm from "@containers/Gifts/form";
import { Routes } from "@utils/constants";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const GiftPage = () => {
  const router = useRouter();
  const id = router.query.id;
  const { data: weddingData, loading: weddingLoading } = useWeddingQuery();
  const [getGift, { data, loading }] = useGiftLazyQuery();

  useEffect(() => {
    if (id) {
      getGift({ variables: { id: id as string } });
    }
  }, []);

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
        <title>Gift page - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PrivateRoute>
        <GiftForm wedding={weddingData.wedding} gift={data?.gift} router={router} />
      </PrivateRoute>
    </>
  );
};

export default GiftPage;
