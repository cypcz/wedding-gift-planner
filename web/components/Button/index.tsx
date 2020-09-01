import Link from "next/link";
import { HTMLAttributes } from "react";

interface Props {
  link?: boolean;
  href?: string;
  className?: HTMLAttributes<HTMLElement>["className"];
}

const Button: React.FC<Props> = ({ children, className, link, href }) => {
  const css = `rounded-full focus:outline-none border-solid border-secondary border-1 text-input w-64 self-center bg-white py-2 text-secondary ${
    className || ""
  }`;
  return link ? (
    <Link href={href || "/"}>
      <button className={css}>{children}</button>
    </Link>
  ) : (
    <button className={css}>{children}</button>
  );
};

export default Button;
