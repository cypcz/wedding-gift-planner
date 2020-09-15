import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import "react-datepicker/dist/react-datepicker.css";
import { useApollo } from "../apollo/client";
import "../styles/index.css";

export const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
