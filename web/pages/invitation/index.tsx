import PublicRoute from "@components/PublicRoute";
import Invitation from "@containers/Invitation";
import Head from "next/head";

const InvitationPage = () => {
  return (
    <>
      <Head>
        <title>Invitation - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicRoute>
        <Invitation />
      </PublicRoute>
    </>
  );
};

export default InvitationPage;
