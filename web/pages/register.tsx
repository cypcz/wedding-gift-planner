import PublicRoute from "@components/PublicRoute";
import Register from "@containers/Register";
import Head from "next/head";

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Register - Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicRoute>
        <Register />
      </PublicRoute>
    </>
  );
};

export default RegisterPage;
