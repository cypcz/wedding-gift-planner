import { ValidationError } from "@utils/constants";
import * as yup from "yup";

export const validationSchema = yup.object().shape({
  partner1Name: yup.string().required(ValidationError.Required),
  partner2Name: yup.string().required(ValidationError.Required),
  partnersEmail: yup.string().email(ValidationError.Email),
  location: yup.string().required(ValidationError.Required),
  date: yup
    .date()
    .required(ValidationError.Required)
    .min(yup.ref("rsvpUntil"), "Wedding date must be greater than RSVP date"),
  rsvpUntil: yup
    .date()
    .required(ValidationError.Required)
    .max(yup.ref("date"), "RSVP date must be lower than wedding date"),
});
