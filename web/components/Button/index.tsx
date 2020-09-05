import Link from "next/link";
import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react";

interface Props {
  link?: boolean;
  href?: string;
  className?: HTMLAttributes<HTMLElement>["className"];
}

const Button: React.FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & Props
> = ({ children, className, link, href, ...rest }) => {
  const css = `rounded-full focus:outline-none border-solid border-secondary border-1 text-input w-64 self-center bg-white py-2 text-secondary ${
    className || ""
  }`;
  return link ? (
    <Link href={href || "/"}>
      <button {...rest} className={css}>
        {children}
      </button>
    </Link>
  ) : (
    <button {...rest} className={css}>
      {children}
    </button>
  );
};

export default Button;
