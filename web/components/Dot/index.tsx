import { HTMLAttributes } from "react";

interface Props {
  className?: HTMLAttributes<HTMLElement>["className"];
}

const Dot: React.FC<Props> = ({ className }) => {
  return <div className={`bg-secondary rounded-full self-center ${className}`} />;
};

export default Dot;
