import PublicRoute from "@components/PublicRoute";
import Login from "@containers/Login";
import Head from "next/head";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicRoute>
        <Login />
      </PublicRoute>
    </>
  );
};

export default LoginPage;
