import { useLoginMutation, useLogoutMutation } from "@codegen/generated/graphql";
import firebase from "@utils/firebase";
import { UserContext } from "@utils/userContext";
import { get as getCookie } from "js-cookie";
import Head from "next/head";
import { useContext } from "react";
import { useForm } from "react-hook-form";

interface LoginValues {
  email: string;
  password: string;
}

const Index = () => {
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const { user, loading, refetchUser } = useContext(UserContext);
  const { handleSubmit, register, errors } = useForm({
    defaultValues: { email: "", password: "" },
  });

  if (loading) return <>loading...</>;

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

  const handleLogout = async () => {
    await logout();
    await refetchUser();
  };

  return (
    <>
      <Head>
        <title>Wedding gift planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {!user ? (
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col justify-center align-middle h-screen bg-bg"
          >
            <div className="my-1 text-center flex flex-col items-center">
              <input
                name="email"
                ref={register({
                  required: "Required",
                })}
              />
            </div>
            <div className="my-1 text-center flex flex-col items-center">
              <input
                name="password"
                type="password"
                ref={register({
                  required: "Password is required",
                })}
              />
              {errors.password && errors.password.message}
            </div>
            <div className="text-center">
              <button type="submit">login</button>
            </div>
          </form>
        ) : (
          <button onClick={handleLogout}>logout</button>
        )}
      </main>
      <footer>footerrr</footer>
    </>
  );
};

export default Index;
