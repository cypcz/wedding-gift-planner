import { useProviderRegisterMutation } from "@codegen/generated/graphql";
import Button from "@components/Buttons/Button";
import Google from "@components/Icons/Google";
import { AuthContext } from "@utils/authContext";
import { Routes } from "@utils/constants";
import firebase from "@utils/firebase";
import { useRouter } from "next/router";
import { useContext } from "react";

const Auth = () => {
  const { setAuthState } = useContext(AuthContext);
  const router = useRouter();
  const [providerRegister, { loading }] = useProviderRegisterMutation();

  const handleProviderLogin = async (type: "fb" | "google") => {
    const provider =
      type === "fb"
        ? new firebase.auth.FacebookAuthProvider()
        : new firebase.auth.GoogleAuthProvider();
    const credential = await firebase.auth().signInWithPopup(provider);
    if (credential.additionalUserInfo?.isNewUser) {
      const { data } = await providerRegister();
      data && setAuthState({ user: data.providerRegister, loading: false });
    }
  };

  return (
    <>
      <h3>Please create your account or log in</h3>
      {!router.query.data && (
        <Button link href={Routes.LOGIN.path} disabled={loading}>
          Log in
        </Button>
      )}
      <Button link href={Routes.REGISTER.path} disabled={loading}>
        Create account
      </Button>
      <Button onClick={() => handleProviderLogin("google")} disabled={loading}>
        <Google />
        <span>Log in with Google</span>
      </Button>
    </>
  );
};

export default Auth;
