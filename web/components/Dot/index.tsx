import { HTMLAttributes } from "react";

interface Props {
  className?: HTMLAttributes<HTMLElement>["className"];
}

const Dot: React.FC<Props> = ({ className }) => {
  return <div className={`h-1 w-1 bg-secondary rounded-full self-center ${className}`} />;
};

export default Dot;
