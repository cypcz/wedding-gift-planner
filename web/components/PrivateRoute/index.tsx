import Logo from "@components/Icons/Logo";
import ResendEmailVerification from "@containers/EmailVerification/resend";
import { Routes } from "@utils/constants";
import { UserContext } from "@utils/userContext";
import { useRouter } from "next/router";
import { useContext } from "react";

const PrivateRoute: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  if (!user) {
    router.replace(Routes.AUTH.path);
    return <Logo className="animate-ping" />;
  }

  if (!user.emailVerified) {
    return <ResendEmailVerification />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
