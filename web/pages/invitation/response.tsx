import PublicRoute from "@components/PublicRoute";
import InvitationResponse from "@containers/Invitation/response";
import Head from "next/head";

const InvitationResponsePage = () => {
  return (
    <>
      <Head>
        <title>Invitation response - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicRoute>
        <InvitationResponse />
      </PublicRoute>
    </>
  );
};

export default InvitationResponsePage;
