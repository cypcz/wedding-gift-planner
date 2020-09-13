import Layout from "@components/Layout";
import PrivateRoute from "@components/PrivateRoute";
import Wedding from "@containers/Wedding";
import UserProvider from "@utils/userContext";
import Head from "next/head";

const WeddingPage = () => {
  return (
    <>
      <Head>
        <title>Wedding - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserProvider>
        <Layout heading="Congratulations on your Wedding!">
          <PrivateRoute>
            <Wedding />
          </PrivateRoute>
        </Layout>
      </UserProvider>
    </>
  );
};

export default WeddingPage;
