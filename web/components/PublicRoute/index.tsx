import { UserContext } from "@utils/userContext";
import { useRouter } from "next/router";
import { useContext } from "react";

const PublicRoute: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  if (user) {
    router.replace("/app");
    return <></>;
  }
  return <>{children}</>;
};

export default PublicRoute;
