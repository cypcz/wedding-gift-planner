import SubmitButton from "@components/Buttons/SubmitButton";
import Input from "@components/Inputs/Input";
import { errorToast } from "@components/Toast";
import { Routes } from "@utils/constants";
import firebase from "@utils/firebase";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { validationSchema } from "./helpers";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      setLoading(true);
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        setLoading(false);
      } catch (e) {
        errorToast("Oops! Incorrect email or password!");
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <h3>Log in</h3>
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
        <div>Forgot your password?</div>
      </Link>
      <SubmitButton type="submit" disabled={loading} />
      <div>Oh no! That&apos;s not what you wanted?</div>
      <Link href={Routes.AUTH.path}>
        <div>Go back</div>
      </Link>
    </form>
  );
};

export default Login;
