import Link from "next/link";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { UrlObject } from "url";

interface Props {
  link?: boolean;
  href?: string | UrlObject;
}

const Button: React.FC<
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    Props
> = ({ children, link, href, ...rest }) => {
  return link ? (
    <Link href={href || "/"}>
      <button {...rest}>{children}</button>
    </Link>
  ) : (
    <button {...rest}>{children}</button>
  );
};

export default Button;
