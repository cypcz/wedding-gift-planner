import Logo from "@components/Icons/Logo";
import { Routes } from "@utils/constants";
import { UserContext } from "@utils/userContext";
import { useRouter } from "next/router";
import { useContext } from "react";

const PublicRoute: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  if (user) {
    router.replace(Routes.WEDDING.path);
    return <Logo className="animate-ping" />;
  }
  return <>{children}</>;
};

export default PublicRoute;
