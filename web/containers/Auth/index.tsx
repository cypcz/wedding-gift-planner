//import firebase from "@utils/firebase";
import Button from "@components/Button";
import Facebook from "@components/Icons/Facebook";
import Google from "@components/Icons/Google";

const Auth = () => {
  return (
    <>
      <h1 className="font-corsiva text-center mt-12 text-4xl">Wedding Gifts Planner</h1>
      <main className="flex flex-col justify-center align-middle h-full">
        <h3 className="font-corsiva text-center mb-10 text-2xl">
          Please create your account or log in
        </h3>
        <Button link href="/login" className="mb-4">
          Log in
        </Button>
        <Button link href="/register">
          Create account
        </Button>
        <div className="h-2 w-2 bg-secondary rounded-full self-center my-6" />
        <Button className="flex justify-evenly mb-4">
          <Google className="w-6 h-6" />
          <span>Log in with Google</span>
        </Button>
        <Button className="flex justify-evenly">
          <Facebook className="w-6 h-6" />
          <span>Log in with Facebook</span>
        </Button>
      </main>
    </>
  );
};

export default Auth;
