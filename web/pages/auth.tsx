import PublicRoute from "@components/PublicRoute";
import Auth from "@containers/Auth";
import Head from "next/head";

const AuthPage = () => {
  return (
    <>
      <Head>
        <title>Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicRoute>
        <Auth />
      </PublicRoute>
    </>
  );
};

export default AuthPage;
