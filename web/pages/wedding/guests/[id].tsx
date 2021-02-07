import { useGuestLazyQuery, useWeddingQuery } from "@codegen/generated/graphql";
import Logo from "@components/Icons/Logo";
import PrivateRoute from "@components/PrivateRoute";
import GuestForm from "@containers/Guests/form";
import { Routes } from "@utils/constants";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const GuestPage = () => {
  const router = useRouter();
  const id = router.query.id;
  const { data: weddingData, loading: weddingLoading } = useWeddingQuery();
  const [getGuest, { data, loading }] = useGuestLazyQuery();

  useEffect(() => {
    if (id) {
      getGuest({ variables: { id: id as string } });
    }
  }, []);

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
        <title>Guest page - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PrivateRoute>
        <GuestForm
          wedding={weddingData.wedding}
          guest={data?.guest}
          router={router}
        />
      </PrivateRoute>
    </>
  );
};

export default GuestPage;
