import { useUpsertGuestMutation } from "@codegen/generated/graphql";
import Dot from "@components/Dot";
import Input from "@components/Input";
import { UserContext } from "@utils/userContext";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useContext } from "react";

const GuestForm = () => {
  const { user, refetchUser } = useContext(UserContext);
  const router = useRouter();
  const [upsertGuest] = useUpsertGuestMutation();
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      plusX: 0,
    },
    onSubmit: async (values) => {
      await upsertGuest({
        variables: {
          input: { ...values, plusX: Number(values.plusX), weddingId: user?.wedding?.id! },
        },
      });

      await refetchUser();
    },
  });

  if (!user?.wedding) {
    router.replace("/wedding");
    return <></>;
  }

  return (
    <main className="flex flex-col mt-16 w-2/5 mx-auto">
      <form onSubmit={handleSubmit}>
        <h3 className="font-corsiva text-center mb-4 text-2xl">New Guest</h3>
        <div className="flex justify-evenly">
          <Input
            fullWidth
            name="firstName"
            placeholder="First name"
            onChange={handleChange}
            value={values.firstName}
          />
          <Input
            fullWidth
            name="lastName"
            placeholder="Last name"
            onChange={handleChange}
            value={values.lastName}
          />
        </div>
        <h3 className="font-corsiva text-center mt-8 mb-4 text-2xl">
          How many people can your guest bring?
        </h3>
        <Input type="number" name="plusX" onChange={handleChange} value={values.plusX} />
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

export default GuestForm;
