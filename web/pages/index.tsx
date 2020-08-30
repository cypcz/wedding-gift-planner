import Index from "@containers/Index";
import Head from "next/head";

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Index />
    </>
  );
};

export default IndexPage;
