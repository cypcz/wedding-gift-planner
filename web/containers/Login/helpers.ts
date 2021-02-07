import { ValidationError } from "@utils/constants";
import * as yup from "yup";

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(ValidationError.Email)
    .required(ValidationError.Required),
  password: yup
    .string()
    .min(6, "At least 6 characters!")
    .required(ValidationError.Required),
});
