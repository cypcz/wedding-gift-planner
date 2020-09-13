import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";

type Props = {
  fullWidth?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = forwardRef(({ fullWidth, className, ...rest }, ref) => {
  return (
    <input
      {...rest}
      ref={ref}
      className={`rounded-full border-solid border-secondary border-1 text-input outline-none my-1 h-10 pl-4 placeholder-secondary ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    />
  );
});

export default Input;
