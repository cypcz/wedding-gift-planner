import { ValidationError } from "@utils/constants";
import * as yup from "yup";

export const validationSchema = yup.object().shape({
  firstName: yup.string().required(ValidationError.Required),
  lastName: yup.string().required(ValidationError.Required),
  plusX: yup.number().required(ValidationError.Required).min(0, ValidationError.NumPositive),
});
