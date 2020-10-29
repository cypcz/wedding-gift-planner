import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";

type Props = {
  name: string;
  label?: string;
  errors: any;
  touched: any;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = forwardRef(
  ({ className, errors, touched, name, label, ...rest }, ref) => {
    return (
      <div className="flex flex-col mb-8">
        {label && <label className="font-corsiva text-center mb-2 text-2xl">{label}</label>}
        <input
          {...rest}
          name={name}
          ref={ref}
          className={`rounded-full border-solid border-secondary border-1 
          text-input outline-none h-10 pl-4 placeholder-secondary ${className}`}
        />
        {touched[name] && errors[name] && (
          <span className="text-error text-sm text-center">{errors[name]}</span>
        )}
      </div>
    );
  }
);

export default Input;
