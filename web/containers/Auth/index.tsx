//import firebase from "@utils/firebase";
import Link from "next/link";

const Auth = () => {
  //  const { user, loading, refetchUser } = useContext(UserContext);

  //  if (loading) return <>loading...</>;

  return (
    <div className="flex flex-col items-center">
      <Link href="/login">
        <button>Log in</button>
      </Link>
    </div>
  );
};

export default Auth;
