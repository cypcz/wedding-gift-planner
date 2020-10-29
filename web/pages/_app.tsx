import { ApolloProvider } from "@apollo/client";
import Layout from "@components/Layout";
import UserProvider from "@utils/userContext";
import type { AppProps } from "next/app";
import "react-datepicker/dist/react-datepicker.css";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApollo } from "../apollo/client";
import "../styles/index.css";

export const App = ({ Component, pageProps, router }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  // All routes except landing page
  if (router.pathname.length > 1) {
    return (
      <ApolloProvider client={apolloClient}>
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
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </ApolloProvider>
    );
  }

  // Landing page
  return <Component {...pageProps} />;
};

export default App;
