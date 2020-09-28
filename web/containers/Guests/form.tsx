import {
  GuestInfoFragment,
  GuestsDocument,
  GuestsQuery,
  useUpsertGuestMutation,
  WeddingInfoFragment,
} from "@codegen/generated/graphql";
import Dot from "@components/Dot";
import Input from "@components/Input";
import { useFormik } from "formik";
import { NextRouter } from "next/router";

interface Props {
  guest?: GuestInfoFragment;
  wedding: WeddingInfoFragment;
  router: NextRouter;
}

const GuestForm: React.FC<Props> = ({ wedding, guest, router }) => {
  const [upsertGuest] = useUpsertGuestMutation();
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      firstName: guest?.firstName || "",
      lastName: guest?.lastName || "",
      plusX: guest?.plusX || 0,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      await upsertGuest({
        variables: {
          input: {
            ...values,
            plusX: Number(values.plusX),
            weddingId: wedding.id,
            id: guest?.id,
          },
        },
        update: (cache, { data }) => {
          const existingData = cache.readQuery({
            query: GuestsDocument,
          }) as GuestsQuery;
          const updatedGuests = guest?.id
            ? existingData.guests.map((guest) => {
                if (guest.id === data?.upsertGuest.id) return data.upsertGuest;
                return guest;
              })
            : [...existingData.guests, data?.upsertGuest];
          cache.writeQuery({
            query: GuestsDocument,
            data: {
              guests: updatedGuests,
            },
          });

          router.push("/guests");
        },
      });
    },
  });

  return (
    <>
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
    </>
  );
};

export default GuestForm;
