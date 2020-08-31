import Layout from "@components/Layout";
import PrivateRoute from "@components/PrivateRoute";
import UserProvider from "@utils/userContext";
import Head from "next/head";

const AppPage = () => {
  return (
    <>
      <Head>
        <title>App - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserProvider>
        <Layout>
          <PrivateRoute>
            <div>APP</div>
          </PrivateRoute>
        </Layout>
      </UserProvider>
    </>
  );
};

export default AppPage;
