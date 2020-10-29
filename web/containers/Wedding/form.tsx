import {
  useInvitePartnerMutation,
  useUpsertWeddingMutation,
  WeddingDocument,
  WeddingInfoFragment,
  WeddingQuery,
} from "@codegen/generated/graphql";
import SubmitButton from "@components/Buttons/SubmitButton";
import DatePicker from "@components/Inputs/DatePicker";
import Input from "@components/Inputs/Input";
import { errorToast, successToast } from "@components/Toast";
import { DATE_TIME_FORMAT } from "@utils/constants";
import { UserContext } from "@utils/userContext";
import { addMonths, format, parseISO, roundToNearestMinutes } from "date-fns";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useContext } from "react";
import { validationSchema } from "./helpers";

interface Props {
  setShowProfile: Dispatch<SetStateAction<boolean>>;
  wedding?: WeddingInfoFragment;
}

const WeddingForm: React.FC<Props> = ({ setShowProfile, wedding }) => {
  const { user } = useContext(UserContext);
  const [upsertWedding, { loading: upsertWeddingLoading }] = useUpsertWeddingMutation();
  const [invitePartner, { loading: invitePartnerLoading }] = useInvitePartnerMutation();
  const partnersEmail = wedding?.authors.filter((author) => author.id !== user?.id)[0]?.email;
  const {
    handleChange,
    values,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    validationSchema,
    initialValues: {
      partner1Name: wedding?.partner1Name || "",
      partner2Name: wedding?.partner2Name || "",
      partnersEmail: partnersEmail || wedding?.partnersEmail || "",
      location: wedding?.location || "",
      date: wedding?.date && parseISO(wedding.date),
      rsvpUntil: wedding?.rsvpUntil && parseISO(wedding.rsvpUntil),
    },
    onSubmit: async (values) => {
      try {
        await upsertWedding({
          variables: {
            input: { ...values, id: wedding?.id, date: values.date },
          },
          update: (cache, { data }) => {
            const existingData = cache.readQuery({
              query: WeddingDocument,
            }) as WeddingQuery;
            cache.writeQuery({
              query: WeddingDocument,
              data: {
                wedding: {
                  ...existingData.wedding,
                  ...data?.upsertWedding,
                },
              },
            });
          },
        });

        if (wedding?.id) {
          successToast("Wedding updated!");
          setShowProfile(false);
        } else {
          successToast("Wedding created!");
        }
      } catch (e) {
        errorToast("Oops! Something went wrong :(");
      }
    },
  });

  const handleInvitePartner = async (e: any) => {
    e.preventDefault();
    try {
      await invitePartner({ variables: { email: values.partnersEmail } });
      successToast("Invitation sent!");
    } catch (e) {
      errorToast("Oops! Something went wrong :(");
    }
  };

  const loading = upsertWeddingLoading || invitePartnerLoading;

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label className="font-corsiva text-center mb-2 text-2xl">
          Please tell us your first names
        </label>
        <div className="flex justify-evenly">
          <Input
            name="partner1Name"
            placeholder="Julia"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.partner1Name}
            errors={errors}
            touched={touched}
          />
          <div className="font-corsiva mx-8 mt-2 text-xl">&</div>
          <Input
            name="partner2Name"
            placeholder="John"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.partner2Name}
            errors={errors}
            touched={touched}
          />
        </div>
      </div>
      <Input
        name="location"
        label="Location"
        placeholder="111 8th Avenue, New York, NY"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.location}
        errors={errors}
        touched={touched}
      />
      <DatePicker
        name="date"
        label="Select a date of your Wedding"
        placeholderText={format(
          addMonths(roundToNearestMinutes(new Date(), { nearestTo: 30 }), 6),
          DATE_TIME_FORMAT
        )}
        selected={values.date}
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
      />
      <DatePicker
        name="rsvpUntil"
        label="Guests can accept or refuse invitation until"
        placeholderText={format(
          addMonths(roundToNearestMinutes(new Date(), { nearestTo: 30 }), 3),
          DATE_TIME_FORMAT
        )}
        selected={values.rsvpUntil}
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
      />
      <div className="flex items-center">
        <Input
          name="partnersEmail"
          placeholder="john@gmail.com"
          label="Do you want to add your partner's email?"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.partnersEmail}
          disabled={!!partnersEmail}
          errors={errors}
          touched={touched}
        />
        {!partnersEmail && (
          <SubmitButton disabled={loading} onClick={handleInvitePartner}>
            Invite
          </SubmitButton>
        )}
      </div>
      <div className="flex items-center">
        <SubmitButton type="submit" disabled={loading} />
        {wedding && (
          <button
            className="flex flex-col items-center mx-auto focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              setShowProfile(false);
            }}
          >
            Go back
          </button>
        )}
      </div>
    </form>
  );
};

export default WeddingForm;
