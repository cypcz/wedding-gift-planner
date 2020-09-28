import { useLoginMutation, useRegisterMutation } from "@codegen/generated/graphql";
import Dot from "@components/Dot";
import Input from "@components/Input";
import firebase from "@utils/firebase";
import { UserContext } from "@utils/userContext";
import { useFormik } from "formik";
import { get as getCookie } from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

const Register = () => {
  const [login] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const { refetchUser } = useContext(UserContext);
  const router = useRouter();
  const parsedQuery = router.query.data ? JSON.parse(atob(router.query.data as string)) : null;
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: { email: parsedQuery.email || "", password: "" },
    onSubmit: async ({ email, password }) => {
      try {
        await registerMutation({
          variables: { input: { email, password, weddingId: parsedQuery.weddingId } },
        });
      } catch (e) {
        //  setError("Oops! Something went wrong!");
        return;
      }

      let idToken;
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        idToken = await userCredential.user?.getIdToken();
      } catch (e) {
        //  setError("Oops! Something went wrong!");
      }

      const csrfToken = getCookie("csrfToken");

      if (idToken && csrfToken) {
        await login({
          variables: { input: { idToken, csrfToken } },
        });
        await refetchUser();
      }
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className="font-corsiva text-center mb-10 text-2xl">Create Account</h3>
        <div className="my-1 flex flex-col items-center">
          <Input name="email" placeholder="email" onChange={handleChange} value={values.email} />
        </div>
        <div className="mt-1 flex flex-col items-center">
          <Input
            name="password"
            placeholder="password"
            type="password"
            onChange={handleChange}
            value={values.password}
          />
        </div>
        <button
          className="flex flex-col items-center mt-8 mx-auto focus:outline-none"
          type="submit"
        >
          <span className="font-corsiva text-3xl">Proceed</span>
          <div className="flex">
            <Dot className="h-1 w-1" />
            <Dot className="h-1 w-1 mx-2" />
            <Dot className="h-1 w-1" />
          </div>
        </button>
        <div className="text-center font-corsiva text-xl mt-12">
          Oh no! That's not what you wanted?
        </div>
        <Link href={{ pathname: "/auth", query: router.query }}>
          <div className="text-center font-corsiva text-xl underline cursor-pointer">Go back</div>
        </Link>
      </form>
    </>
  );
};

export default Register;
