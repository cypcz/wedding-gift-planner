import { useApolloClient } from "@apollo/client";
import { MeDocument, MeQuery, MeQueryResult } from "@codegen/generated/graphql";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
  user: null as User,
  loading: true,
  refetchUser: (null as unknown) as () => Promise<void>,
});

type User = MeQuery["me"] | null | undefined;

interface State {
  user: User;
  loading: boolean;
}

const UserProvider: React.FC = ({ children }) => {
  const client = useApolloClient();
  const [state, setState] = useState<State>({ user: null, loading: true });

  const fetchMe = async (fromCache?: boolean) => {
    client
      .query({ query: MeDocument, fetchPolicy: fromCache ? "cache-first" : "network-only" })
      .then(({ data }: MeQueryResult) => {
        setState({ user: data?.me, loading: false });
      })
      .catch(() => {
        setState({ user: null, loading: false });
      });
  };

  useEffect(() => {
    fetchMe(true);
  }, []);

  return (
    <UserContext.Provider
      value={{ user: state.user, loading: state.loading, refetchUser: fetchMe }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
