import Logo from "@components/Icons/Logo";
import ResendEmailVerification from "@containers/EmailVerification/resend";
import { AuthContext } from "@utils/authContext";
import { Routes } from "@utils/constants";
import { useRouter } from "next/router";
import { useContext } from "react";

const PrivateRoute: React.FC = ({ children }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  if (!user) {
    router.replace(Routes.AUTH.path);
    return <Logo />;
  }

  if (!user.emailVerified) {
    return <ResendEmailVerification />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
