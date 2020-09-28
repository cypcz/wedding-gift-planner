import PublicRoute from "@components/PublicRoute";
import InvitationGifts from "@containers/Invitation/gifts";
import Head from "next/head";

const InvitationGiftsPage = () => {
  return (
    <>
      <Head>
        <title>Invitation gifts - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicRoute>
        <InvitationGifts />
      </PublicRoute>
    </>
  );
};

export default InvitationGiftsPage;
