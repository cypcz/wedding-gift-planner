import Layout from "@components/Layout";
import PublicRoute from "@components/PublicRoute";
import Login from "@containers/Login";
import UserProvider from "@utils/userContext";
import Head from "next/head";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserProvider>
        <Layout>
          <PublicRoute>
            <Login />
          </PublicRoute>
        </Layout>
      </UserProvider>
    </>
  );
};

export default LoginPage;
