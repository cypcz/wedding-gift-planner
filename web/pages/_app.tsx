import { ApolloProvider } from "@apollo/client";
import Layout from "@components/Layout";
import UserProvider from "@utils/userContext";
import type { AppProps } from "next/app";
import "react-datepicker/dist/react-datepicker.css";
import { useApollo } from "../apollo/client";
import "../styles/index.css";

export const App = ({ Component, pageProps, router }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  if (router.pathname.length > 1) {
    return (
      <ApolloProvider client={apolloClient}>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </ApolloProvider>
    );
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
