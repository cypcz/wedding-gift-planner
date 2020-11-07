import {
  GuestInfoFragment,
  GuestsDocument,
  GuestsQuery,
  GuestStatus,
  useUpsertGuestMutation,
  WeddingInfoFragment,
} from "@codegen/generated/graphql";
import SubmitButton from "@components/Buttons/SubmitButton";
import Input from "@components/Inputs/Input";
import { errorToast, successToast } from "@components/Toast";
import { Routes } from "@utils/constants";
import { useFormik } from "formik";
import { NextRouter } from "next/router";
import { validationSchema } from "./helpers";

interface Props {
  guest?: GuestInfoFragment | null;
  wedding: WeddingInfoFragment;
  router: NextRouter;
}

const GuestForm: React.FC<Props> = ({ wedding, guest, router }) => {
  const [upsertGuest, { loading }] = useUpsertGuestMutation();
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } = useFormik({
    initialValues: {
      firstName: guest?.firstName || "",
      lastName: guest?.lastName || "",
      plusX: guest?.plusX || 0,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await upsertGuest({
          variables: {
            input: {
              ...values,
              weddingId: wedding.id,
              id: guest?.id,
            },
          },
          update: (cache, { data }) => {
            let existingData;
            try {
              existingData = cache.readQuery({
                query: GuestsDocument,
              }) as GuestsQuery;
            } catch (e) {}
            if (existingData) {
              const updatedGuests = guest?.id
                ? existingData.guests.map((guest) =>
                    guest.id === data?.upsertGuest.id ? data.upsertGuest : guest
                  )
                : [...existingData.guests, data?.upsertGuest];
              cache.writeQuery({
                query: GuestsDocument,
                data: {
                  guests: updatedGuests,
                },
              });
            }

            router.push(Routes.GUESTS.path);
          },
        });

        if (guest?.id) {
          successToast("Guest updated!");
        } else {
          successToast("Guest created!");
        }
      } catch (e) {
        errorToast("Oops! Something went wrong :(");
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-corsiva text-center mb-4 text-2xl">New Guest</h3>
      <div className="flex justify-evenly">
        <Input
          name="firstName"
          label="First name"
          placeholder="Thomas"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
          errors={errors}
          touched={touched}
          className="mr-2"
        />
        <Input
          name="lastName"
          label="Last name"
          placeholder="Binks"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          errors={errors}
          touched={touched}
          className="ml-2"
        />
      </div>
      <Input
        type="number"
        name="plusX"
        label="How many people can your guest bring?"
        onChange={(e) => Number(e.target.value) >= 0 && handleChange(e)}
        onBlur={handleBlur}
        value={values.plusX}
        errors={errors}
        touched={touched}
        disabled={!!(guest && guest.status !== GuestStatus.Waiting)}
        className="max-w-5 text-center self-center"
      />
      <SubmitButton type="submit" disabled={loading} />
    </form>
  );
};

export default GuestForm;
