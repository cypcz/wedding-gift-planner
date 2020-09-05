import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = forwardRef((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className="rounded-full border-solid border-secondary border-1 text-input outline-none w-full my-1 h-10 pl-4 placeholder-secondary"
    />
  );
});

export default Input;
