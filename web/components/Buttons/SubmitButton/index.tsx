import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const SubmitButton: React.FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, ...rest }) => {
  return (
    <button {...rest}>
      <span>{children || "Proceed"}</span>
    </button>
  );
};

export default SubmitButton;
