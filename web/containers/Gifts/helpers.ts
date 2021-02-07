import { ValidationError } from "@utils/constants";
import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup.string().required(ValidationError.Required),
  description: yup.string(),
  price: yup
    .number()
    .required(ValidationError.Required)
    .min(0, ValidationError.NumPositive),
  currency: yup.string().required(ValidationError.Required),
  link: yup.string().url(ValidationError.Url),
  imgUrl: yup.string().url(ValidationError.Url),
});
