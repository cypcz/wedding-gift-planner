import Layout from "@components/Layout";
import Auth from "@containers/Auth";
import UserContext from "@utils/userContext";
import Head from "next/head";

const AuthPage = () => {
  return (
    <UserContext>
      <Head>
        <title>Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Auth />
      </Layout>
    </UserContext>
  );
};

export default AuthPage;
