import { useApolloClient } from "@apollo/client";
import { useLogoutMutation } from "@codegen/generated/graphql";
import Dot from "@components/Dot";
import Branch from "@components/Icons/Branch";
import Corner from "@components/Icons/Corner";
import Lines from "@components/Icons/Lines";
import Logo from "@components/Icons/Logo";
import { UserContext } from "@utils/userContext";
import { useContext } from "react";

const Layout: React.FC = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const client = useApolloClient();
  const [logout] = useLogoutMutation();
  const { refetchUser } = useContext(UserContext);

  const handleLogout = async () => {
    await logout();
    await client.clearStore();
    await refetchUser();
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-bg">
      <Corner className="absolute top-1 left-1" />
      <Corner className="absolute bottom-1 right-1" transform="rotate(180)" />
      <Lines className="absolute top-50% transform -translate-y-1/2" />
      <Lines className="absolute top-50% right-0 transform -translate-y-1/2 -scale-x-1" />
      <h1 className="font-corsiva text-center mt-12 text-4xl">Wedding Gifts Planner</h1>
      <div className="flex justify-center items-center">
        <Branch />
        <Dot className="h-2 w-2 my-6 mx-12" />
        <Branch transform="scale(-1, 1)" />
      </div>
      <main className="flex flex-col mt-16 max-w-3/5 min-w-1/3 mx-auto">
        {loading ? <Logo className="animate-ping" /> : children}
      </main>
      <footer className="flex flex-col mt-16 max-w-3/5 mx-auto">
        {user && <button onClick={handleLogout}>logout</button>}
      </footer>
    </div>
  );
};

export default Layout;
