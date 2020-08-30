import Layout from "@components/Layout";
import Login from "@containers/Login";
import UserContext from "@utils/userContext";
import Head from "next/head";

const LoginPage = () => {
  return (
    <UserContext>
      <Head>
        <title>Login - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Login />
      </Layout>
    </UserContext>
  );
};

export default LoginPage;
