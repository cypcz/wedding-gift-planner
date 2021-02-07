import { useRegisterMutation } from "@codegen/generated/graphql";
import SubmitButton from "@components/Buttons/SubmitButton";
import Input from "@components/Inputs/Input";
import { errorToast } from "@components/Toast";
import { Routes } from "@utils/constants";
import firebase from "@utils/firebase";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { validationSchema } from "./helpers";

const Register = () => {
  const [registerMutation, { loading }] = useRegisterMutation();
  const router = useRouter();
  const parsedQuery = router.query.data
    ? JSON.parse(atob(router.query.data as string))
    : null;
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: { email: parsedQuery?.email || "", password: "" },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      try {
        await registerMutation({
          variables: {
            input: { email, password, weddingId: parsedQuery?.weddingId },
          },
        });
      } catch (e) {
        errorToast("Oops! Something went wrong :(");
        return;
      }

      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        errorToast("Oops! Something went wrong :(");
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Account</h3>
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
      <div>Oh no! That's not what you wanted?</div>
      <Link href={{ pathname: Routes.AUTH.path, query: router.query }}>
        <div>Go back</div>
      </Link>
    </form>
  );
};

export default Register;
