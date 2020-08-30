//import firebase from "@utils/firebase";
import Facebook from "@components/Icons/Facebook";
import Google from "@components/Icons/Google";
import Link from "next/link";

const Auth = () => {
  //  const { user, loading, refetchUser } = useContext(UserContext);

  //  if (loading) return <>loading...</>;

  return (
    <>
      <h1 className="text-center mt-12">Wedding Gifts Planner</h1>
      <main className="flex flex-col justify-center align-middle h-full">
        <h3 className="text-center mb-10">Please create your account or log in</h3>
        <Link href="/login">
          <button className="rounded-full focus:outline-none border-solid border-secondary border-1 w-64 self-center bg-white py-2 text-secondary mb-4">
            Log in
          </button>
        </Link>
        <Link href="/register">
          <button className="rounded-full focus:outline-none border-solid border-secondary border-1 w-64 self-center bg-white py-2 text-secondary">
            Create account
          </button>
        </Link>
        <div className="h-2 w-2 bg-secondary rounded-full self-center my-6" />
        <button className="flex focus:outline-none justify-evenly items-center rounded-full border-solid border-secondary border-1 w-64 self-center bg-white py-2 text-secondary mb-4">
          <Google className="w-6 h-6" />
          <span>Log in with Google</span>
        </button>
        <button className="flex focus:outline-none justify-evenly items-center rounded-full border-solid border-secondary border-1 w-64 self-center bg-white py-2 text-secondary">
          <Facebook className="w-6 h-6" />
          <span>Log in with Facebook</span>
        </button>
      </main>
    </>
  );
};

export default Auth;
