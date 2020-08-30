//import firebase from "@utils/firebase";
import { UserContext } from "@utils/userContext";
import Link from "next/link";
import { useContext } from "react";

const Auth = () => {
  const { user, loading, refetchUser } = useContext(UserContext);

  if (loading) return <>loading...</>;

  return (
    <div className="flex flex-col items-center">
      <Link href="/login">
        <button>Log in</button>
      </Link>
    </div>
  );
};

export default Auth;
