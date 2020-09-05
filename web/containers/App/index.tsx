import { useApolloClient } from "@apollo/client";
import { useLogoutMutation } from "@codegen/generated/graphql";
import BigButton from "@components/BigButton";
import { UserContext } from "@utils/userContext";
import { useContext } from "react";

const App = () => {
  const client = useApolloClient();
  const [logout] = useLogoutMutation();
  const { refetchUser } = useContext(UserContext);

  const handleLogout = async () => {
    await logout();
    await client.clearStore();
    await refetchUser();
  };
  return (
    <>
      <main className="flex justify-center items-center h-screen">
        <BigButton onClick={handleLogout}>Logout</BigButton>
      </main>
      <footer></footer>
    </>
  );
};

export default App;
