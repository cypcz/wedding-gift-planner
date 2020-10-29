import { useLoginMutation } from "@codegen/generated/graphql";
import SubmitButton from "@components/Buttons/SubmitButton";
import Input from "@components/Inputs/Input";
import { errorToast } from "@components/Toast";
import { Routes } from "@utils/constants";
import firebase from "@utils/firebase";
import { UserContext } from "@utils/userContext";
import { useFormik } from "formik";
import { get as getCookie } from "js-cookie";
import Link from "next/link";
import { useContext } from "react";
import { validationSchema } from "./helpers";

const Login = () => {
  const [login, { loading }] = useLoginMutation();
  const { refetchUser } = useContext(UserContext);
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      let idToken;
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        idToken = await userCredential.user?.getIdToken();
      } catch (e) {
        errorToast("Oops! Incorrect email or password!");
      }

      const csrfToken = getCookie("csrfToken");

      try {
        if (idToken && csrfToken) {
          await login({
            variables: { input: { idToken, csrfToken } },
          });
          await refetchUser();
        } else {
          errorToast("Oops! Something went wrong :(");
        }
      } catch (e) {
        errorToast("Oops! Something went wrong :(");
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-corsiva text-center mb-10 text-2xl">Log in</h3>
      <Input
        name="email"
        label="Email"
        placeholder="john@gmail.com"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        errors={errors}
        touched={touched}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        errors={errors}
        touched={touched}
      />
      <Link href={Routes.FORGOT_PASSWORD.path}>
        <div className="font-corsiva underline mb-8 cursor-pointer text-lg">
          Forgot your password?
        </div>
      </Link>
      <SubmitButton type="submit" disabled={loading} />
      <div className="text-center font-corsiva text-xl mt-12">
        Oh no! That's not what you wanted?
      </div>
      <Link href={Routes.AUTH.path}>
        <div className="text-center font-corsiva text-xl underline cursor-pointer">Go back</div>
      </Link>
    </form>
  );
};

export default Login;
