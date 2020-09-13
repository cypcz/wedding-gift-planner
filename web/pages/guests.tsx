import Layout from "@components/Layout";
import PrivateRoute from "@components/PrivateRoute";
import Guests from "@containers/Guests";
import UserProvider from "@utils/userContext";
import Head from "next/head";

const GuestsPage = () => {
  return (
    <>
      <Head>
        <title>Wedding guests - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserProvider>
        <Layout heading="Congratulations on your Wedding!">
          <PrivateRoute>
            <Guests />
          </PrivateRoute>
        </Layout>
      </UserProvider>
    </>
  );
};

export default GuestsPage;
