import Layout from "@components/Layout";
import PrivateRoute from "@components/PrivateRoute";
import GuestForm from "@containers/Guests/form";
import UserProvider from "@utils/userContext";
import Head from "next/head";

const NewGuestPage = () => {
  return (
    <>
      <Head>
        <title>New Guest - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserProvider>
        <Layout heading="Congratulations on your Wedding!">
          <PrivateRoute>
            <GuestForm />
          </PrivateRoute>
        </Layout>
      </UserProvider>
    </>
  );
};

export default NewGuestPage;
