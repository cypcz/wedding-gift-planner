import { useLoginMutation, useRegisterMutation } from "@codegen/generated/graphql";
import SubmitButton from "@components/Buttons/SubmitButton";
import Input from "@components/Inputs/Input";
import { errorToast } from "@components/Toast";
import { Routes } from "@utils/constants";
import firebase from "@utils/firebase";
import { UserContext } from "@utils/userContext";
import { useFormik } from "formik";
import { get as getCookie } from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { validationSchema } from "./helpers";

const Register = () => {
  const [login, { loading: loginLoading }] = useLoginMutation();
  const [registerMutation, { loading: registerLoading }] = useRegisterMutation();
  const { refetchUser } = useContext(UserContext);
  const router = useRouter();
  const parsedQuery = router.query.data ? JSON.parse(atob(router.query.data as string)) : null;
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } = useFormik({
    initialValues: { email: parsedQuery?.email || "", password: "" },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      try {
        await registerMutation({
          variables: { input: { email, password, weddingId: parsedQuery?.weddingId } },
        });
      } catch (e) {
        errorToast("Oops! Something went wrong :(");
        return;
      }

      let idToken;
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        idToken = await userCredential.user?.getIdToken();
      } catch (e) {
        errorToast("Oops! Something went wrong :(");
      }

      const csrfToken = getCookie("csrfToken");

      try {
        if (idToken && csrfToken) {
          await login({
            variables: { input: { idToken, csrfToken } },
          });
          await refetchUser();
        }
      } catch (e) {
        errorToast("Oops! Something went wrong :(");
      }
    },
  });

  const loading = loginLoading || registerLoading;

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-corsiva text-center mb-10 text-2xl">Create Account</h3>
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
      <SubmitButton type="submit" disabled={loading} />
      <div className="text-center font-corsiva text-xl mt-12">
        Oh no! That's not what you wanted?
      </div>
      <Link href={{ pathname: Routes.AUTH.path, query: router.query }}>
        <div className="text-center font-corsiva text-xl underline cursor-pointer">Go back</div>
      </Link>
    </form>
  );
};

export default Register;
