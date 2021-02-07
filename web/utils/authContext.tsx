import { useApolloClient } from "@apollo/client";
import { MeDocument, MeQuery } from "@codegen/generated/graphql";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import firebase from "./firebase";

type User = MeQuery["me"] | undefined;
interface State {
  user: User | null;
  loading: boolean;
}

interface AuthContext {
  user: State["user"];
  loading: State["loading"];
  setAuthState: Dispatch<SetStateAction<State>>;
}

export const AuthContext = createContext({
  user: null,
  loading: true,
  setAuthState: () => {},
} as AuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const client = useApolloClient();
  const [state, setState] = useState<State>({ user: null, loading: true });

  const resetState = () => {
    setState({ user: null, loading: false });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) return resetState();
      try {
        const { data } = await client.query<MeQuery>({
          query: MeDocument,
          fetchPolicy: "network-only",
        });
        if (!data.me) return resetState();

        setState({ user: data.me, loading: false });
      } catch {
        return resetState();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        setAuthState: setState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
