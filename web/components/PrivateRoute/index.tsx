import { UserContext } from "@utils/userContext";
import { useRouter } from "next/router";
import { useContext } from "react";

const PrivateRoute: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  if (!user) {
    router.replace("/auth");
    return <></>;
  }
  return <>{children}</>;
};

export default PrivateRoute;
