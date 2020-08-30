import { HTMLAttributes } from "react";

interface Props {
  className?: HTMLAttributes<HTMLElement>["className"];
  transform?: string;
}

const Corner: React.FC<Props> = ({ className, transform }) => {
  return (
    <svg
      className={className}
      transform={transform}
      width="90"
      height="90"
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line y1="9.5" x2="90" y2="9.5" stroke="black" />
      <line x1="10.5" x2="10.5" y2="90" stroke="black" />
      <line x1="17.5" y1="10" x2="17.5" y2="80" stroke="black" />
      <line x1="10" y1="16.5" x2="80" y2="16.5" stroke="black" />
    </svg>
  );
};

export default Corner;
