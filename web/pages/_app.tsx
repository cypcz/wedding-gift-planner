import { ApolloProvider } from "@apollo/client";
import Layout from "@components/Layout";
import AuthProvider from "@utils/authContext";
import { globalStyles } from "@utils/globalStyles";
import type { AppProps } from "next/app";
import "react-datepicker/dist/react-datepicker.css";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApollo } from "../apollo/client";

export const App = ({ Component, pageProps, router }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  // All routes except landing page
  if (router.pathname.length > 1) {
    return (
      <ApolloProvider client={apolloClient}>
        {globalStyles}
        <ToastContainer
          hideProgressBar
          newestOnTop
          autoClose={3000}
          limit={3}
          pauseOnHover={false}
          closeOnClick={false}
          transition={Slide}
          closeButton={false}
        />
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ApolloProvider>
    );
  }

  // Landing page
  return (
    <>
      {globalStyles}
      <Component {...pageProps} />
    </>
  );
};

export default App;
