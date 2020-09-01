import { useLoginMutation } from "@codegen/generated/graphql";
import Dot from "@components/Dot";
import Input from "@components/Input";
import firebase from "@utils/firebase";
import { UserContext } from "@utils/userContext";
import { get as getCookie } from "js-cookie";
import { useContext } from "react";
import { useForm } from "react-hook-form";

interface LoginValues {
  email: string;
  password: string;
}

const Login = () => {
  const [login] = useLoginMutation();
  const { refetchUser } = useContext(UserContext);
  const { handleSubmit, register, errors } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const handleLogin = async ({ email, password }: LoginValues) => {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const idToken = await userCredential.user?.getIdToken();
    const csrfToken = getCookie("csrfToken");

    if (idToken && csrfToken) {
      await login({
        variables: { idToken, csrfToken },
      });
      await refetchUser();
    }
  };

  return (
    <main className="h-full">
      <form
        className="flex flex-col justify-center align-middle h-full"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h3 className="font-corsiva text-center mb-10 text-2xl">Log in</h3>
        <div className="my-1 text-center flex flex-col items-center">
          <Input
            name="email"
            placeholder="email"
            ref={register({
              required: "Required",
            })}
          />
          {errors.email && errors.email.message}
        </div>
        <div className="my-1 text-center flex flex-col items-center">
          <Input
            name="password"
            placeholder="password"
            type="password"
            ref={register({
              required: "Password is required",
            })}
          />
          {errors.password && errors.password.message}
        </div>
        <Dot className="h-2 w-2 mt-6 mb-8 mx-auto" />
        <button className="flex flex-col items-center mx-auto focus:outline-none" type="submit">
          <span className="font-corsiva text-3xl">Proceed</span>
          <div className="flex">
            <Dot className="h-1 w-1" />
            <Dot className="h-1 w-1 mx-2" />
            <Dot className="h-1 w-1" />
          </div>
        </button>
      </form>
    </main>
  );
};

export default Login;
