import Branch from "@components/Icons/Branch";
import Link from "next/link";
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";

interface Props {
  link?: boolean;
  href?: string;
}

const Button: React.FC<DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = forwardRef(({ children, ...rest }, ref) => (
  <button {...rest} ref={ref} className="font-corsiva text-4xl focus:outline-none">
    <div className="flex justify-between px-4">
      <Branch transform="scale(1, -1)" />
      <Branch transform="scale(-1, -1)" />
    </div>
    {children}
    <div className="flex justify-between px-4">
      <Branch transform="scale(1, 1)" />
      <Branch transform="scale(-1, 1)" />
    </div>
  </button>
));

const BigButton: React.FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & Props
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
