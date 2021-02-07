import { useVerifyEmailMutation } from "@codegen/generated/graphql";
import BigButton from "@components/Buttons/BigButton";
import Logo from "@components/Icons/Logo";
import { errorToast } from "@components/Toast";
import { Routes } from "@utils/constants";
import firebase from "@utils/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EmailVerification = () => {
  const router = useRouter();
  const [state, setState] = useState({ loading: true, success: false });
  const [verifyEmail] = useVerifyEmailMutation();

  useEffect(() => {
    if (router.query.oobCode) {
      firebase
        .auth()
        .checkActionCode(router.query.oobCode as string)
        .then((res) => {
          if (res.operation === "VERIFY_EMAIL" && res.data.email) {
            verifyEmail({
              variables: { email: res.data.email },
            })
              .then(() => {
                /*                 refetchUser().then(() => {
                  setState({ loading: false, success: true });
                }); */
              })
              .catch((err) => {
                console.log(err);
                setState({ ...state, loading: false });
              });
          } else {
            errorToast("Something went wrong");
            setState({ ...state, loading: false });
          }
        })
        .catch((err) => {
          console.log(err);
          errorToast("Something went wrong");
          setState({ ...state, loading: false });
        });
    } else {
      setState({ ...state, loading: false });
    }
  }, []);

  if (state.loading) return <Logo />;

  return (
    <>
      <h3>
        {state.success
          ? "Email successfully verified"
          : "Something went wrong. Please continue to the app where you can ask for resending verification email"}
      </h3>
      <BigButton link href={Routes.WEDDING.path}>
        To the App!
      </BigButton>
    </>
  );
};

export default EmailVerification;
