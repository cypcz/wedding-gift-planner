import { useLoginMutation } from "@codegen/generated/graphql";
import Button from "@components/Buttons/Button";
import Dot from "@components/Dot";
import Google from "@components/Icons/Google";
import { Routes } from "@utils/constants";
import firebase from "@utils/firebase";
import { UserContext } from "@utils/userContext";
import { get as getCookie } from "js-cookie";
import { useRouter } from "next/router";
import { useContext } from "react";

const Auth = () => {
  const [login] = useLoginMutation();
  const { refetchUser } = useContext(UserContext);
  const router = useRouter();

  const parsedQuery = router.query.data ? JSON.parse(atob(router.query.data as string)) : null;

  const handleProviderLogin = async (type: "fb" | "google") => {
    const provider =
      type === "fb"
        ? new firebase.auth.FacebookAuthProvider()
        : new firebase.auth.GoogleAuthProvider();
    let idToken;
    try {
      const userCredential = await firebase.auth().signInWithPopup(provider);
      idToken = await userCredential.user?.getIdToken();
    } catch (e) {
      console.log(e);
    }

    const csrfToken = getCookie("csrfToken");

    if (idToken && csrfToken) {
      await login({
        variables: {
          input: { idToken, csrfToken, isProvider: true, weddingId: parsedQuery?.weddingId },
        },
      });
      await refetchUser();
    }
  };

  return (
    <>
      <h3 className="font-corsiva text-center mt-16 mb-10 text-2xl">
        {/*         <Branch transform="scale(1, -1)" />
         */}
        Please create your account or log in
      </h3>
      {!router.query.data && (
        <Button link href={Routes.LOGIN.path} className="mb-4">
          Log in
        </Button>
      )}
      <Button link href={{ pathname: Routes.REGISTER.path, query: router.query }}>
        Create account
      </Button>
      <Dot className="h-2 w-2 my-6" />
      <Button className="flex justify-evenly mb-4" onClick={() => handleProviderLogin("google")}>
        <Google className="w-6 h-6" />
        <span>Log in with Google</span>
      </Button>
      {/*       <Button className="flex justify-evenly" onClick={() => handleProviderLogin("fb")}>
        <Facebook className="w-6 h-6" />
        <span>Log in with Facebook</span>
      </Button>
      <Branch transform="scale(-1, 1)" /> */}
    </>
  );
};

export default Auth;
