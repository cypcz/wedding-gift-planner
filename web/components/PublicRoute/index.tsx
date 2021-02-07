import Logo from "@components/Icons/Logo";
import { AuthContext } from "@utils/authContext";
import { Routes } from "@utils/constants";
import { useRouter } from "next/router";
import { useContext } from "react";

const PublicRoute: React.FC = ({ children }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  if (user) {
    router.replace(Routes.WEDDING.path);
    return <Logo />;
  }
  return <>{children}</>;
};

export default PublicRoute;
