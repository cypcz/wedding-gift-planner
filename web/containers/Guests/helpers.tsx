import { GuestInfoFragment, GuestStatus } from "@codegen/generated/graphql";
import { ValidationError } from "@utils/constants";
import * as yup from "yup";

export const validationSchema = yup.object().shape({
  firstName: yup.string().required(ValidationError.Required),
  lastName: yup.string().required(ValidationError.Required),
  plusX: yup
    .number()
    .required(ValidationError.Required)
    .min(0, ValidationError.NumPositive),
});

export const renderStatusIcon = (status: GuestStatus) => {
  if (status === GuestStatus.Accepted) return <div></div>;
  else if (status === GuestStatus.Declined) return <div></div>;
  return <div></div>;
};

export const getGuestCounts = (guests?: GuestInfoFragment[]) =>
  guests?.reduce(
    (acc, val) => ({
      total: (acc.total += 1 + (val.plusGuests.length || val.plusX)),
      accepted:
        val.status === GuestStatus.Accepted
          ? (acc.accepted += 1 + (val.plusGuests.length || val.plusX))
          : acc.accepted,
      declined:
        val.status === GuestStatus.Declined
          ? (acc.declined += 1 + (val.plusGuests.length || val.plusX))
          : acc.declined,
      waiting:
        val.status === GuestStatus.Waiting
          ? (acc.waiting += 1 + (val.plusGuests.length || val.plusX))
          : acc.waiting,
    }),
    { total: 0, accepted: 0, declined: 0, waiting: 0 },
  );
