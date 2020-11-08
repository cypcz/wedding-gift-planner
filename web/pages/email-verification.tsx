import EmailVerification from "@containers/EmailVerification";
import Head from "next/head";

const EmailVerificationPage = () => {
  return (
    <>
      <Head>
        <title>Wedding gift planner - Email verification</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EmailVerification />
    </>
  );
};

export default EmailVerificationPage;
