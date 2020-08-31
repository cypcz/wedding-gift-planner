import Corner from "@components/Icons/Corner";
import Lines from "@components/Icons/Lines";
import { UserContext } from "@utils/userContext";
import { useContext } from "react";

const Layout: React.FC = ({ children }) => {
  const { loading } = useContext(UserContext);
  return (
    <div className="relative flex flex-col h-screen bg-bg">
      <Corner className="absolute top-1 left-1" />
      <Corner className="absolute bottom-1 right-1" transform="rotate(180)" />
      <Lines className="absolute top-50% transform -translate-y-1/2 w-1/3" />
      <Lines className="absolute top-50% right-0 transform -translate-y-1/2 w-1/3 -scale-x-1" />
      {loading ? <div className="text-center">loading...</div> : children}
      <footer></footer>
    </div>
  );
};

export default Layout;
