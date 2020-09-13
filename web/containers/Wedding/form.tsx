import { useUpsertWeddingMutation } from "@codegen/generated/graphql";
import Dot from "@components/Dot";
import Input from "@components/Input";
import { UserContext } from "@utils/userContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";

interface WeddingValues {
  partner1Name: string;
  partner2Name: string;
  date: Date;
  partnersEmail?: string;
}

const WeddingForm = () => {
  const { user, refetchUser } = useContext(UserContext);
  const [upsertWedding] = useUpsertWeddingMutation();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      partner1Name: user?.wedding?.partner1Name || "",
      partner2Name: user?.wedding?.partner2Name || "",
      partnersEmail: "",
      date: user?.wedding?.date || new Date(),
    },
  });

  const submit = async (values: WeddingValues) => {
    await upsertWedding({
      variables: {
        input: { ...values, id: user?.wedding?.id, date: new Date(values.date).toISOString() },
      },
    });

    await refetchUser();
  };

  return (
    <main className="flex flex-col mt-16 w-2/5 mx-auto">
      <form onSubmit={handleSubmit(submit)}>
        <h3 className="font-corsiva text-center mb-4 text-2xl">Please tell us your first names</h3>
        <div className="flex justify-evenly">
          <Input fullWidth name="partner1Name" ref={register()} />
          <div className="font-corsiva mx-8 text-xl flex items-center">&</div>
          <Input fullWidth name="partner2Name" ref={register()} />
        </div>
        <h3 className="font-corsiva text-center mt-8 mb-4 text-2xl">
          Select a date of your Wedding
        </h3>
        {/* TODO: date picker */}
        <input type="date" name="date" ref={register()} />
        <h3 className="font-corsiva text-center mb-4 text-2xl">
          Do you want to add your partner's email?
        </h3>
        <Input className="w-2/3 flex my-0 mx-auto" name="partnersEmail" ref={register()} />
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

export default WeddingForm;
