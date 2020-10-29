import Dot from "@components/Dot";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const SubmitButton: React.FC<DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = ({ children, ...rest }) => {
  return (
    <button
      className={`flex flex-col items-center mx-auto focus:outline-none ${
        rest.disabled ? "cursor-default" : ""
      }`}
      {...rest}
    >
      <span className="font-corsiva text-3xl">{children || "Proceed"}</span>
      <div className="flex">
        <Dot className={rest.disabled ? "animate-dotLoading1" : ""} />
        <Dot className={rest.disabled ? "animate-dotLoading2 mx-2" : "mx-2"} />
        <Dot className={rest.disabled ? "animate-dotLoading3" : ""} />
      </div>
    </button>
  );
};

export default SubmitButton;
