import { useApolloClient } from "@apollo/client";
import Logo from "@components/Icons/Logo";
import { AuthContext } from "@utils/authContext";
import firebase from "@utils/firebase";
import { useContext } from "react";

const Layout: React.FC = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const client = useApolloClient();

  const handleLogout = async () => {
    await firebase.auth().signOut();
    await client.clearStore();
  };

  return (
    <div>
      <h1>Wedding Gifts Planner</h1>
      <main>{loading ? <Logo /> : children}</main>
      <footer>{user && <button onClick={handleLogout}>logout</button>}</footer>
    </div>
  );
};

export default Layout;
