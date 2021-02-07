import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";

type Props = {
  name: string;
  label?: string;
  errors: any;
  touched: any;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = forwardRef(
  ({ errors, touched, name, label, ...rest }, ref) => {
    return (
      <div>
        {label && <label>{label}</label>}
        <input {...rest} name={name} ref={ref} />
        {touched[name] && errors[name] && <span>{errors[name]}</span>}
      </div>
    );
  },
);

export default Input;
