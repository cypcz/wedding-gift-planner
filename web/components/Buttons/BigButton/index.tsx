import Link from "next/link";
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";

interface Props {
  link?: boolean;
  href?: string;
}

const Button: React.FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = forwardRef(({ children, ...rest }, ref) => (
  <button {...rest} ref={ref}>
    {children}
  </button>
));

const BigButton: React.FC<
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    Props
> = ({ children, link, href, ...rest }) => {
  return link ? (
    <Link href={href || "/"}>
      <Button {...rest}>{children}</Button>
    </Link>
  ) : (
    <Button {...rest}>{children}</Button>
  );
};

export default BigButton;
