import Layout from "@components/Layout";
import PublicRoute from "@components/PublicRoute";
import Register from "@containers/Register";
import UserProvider from "@utils/userContext";
import Head from "next/head";

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Register - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserProvider>
        <Layout>
          <PublicRoute>
            <Register />
          </PublicRoute>
        </Layout>
      </UserProvider>
    </>
  );
};

export default RegisterPage;
