import { DetailedHTMLProps, forwardRef, TextareaHTMLAttributes } from "react";

type Props = {
  name: string;
  label?: string;
  errors: any;
  touched: any;
} & DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

const TextArea: React.FC<Props> = forwardRef(
  ({ errors, touched, name, label, ...rest }, ref) => {
    return (
      <div>
        {label && <label>{label}</label>}
        <textarea {...rest} name={name} ref={ref} />
        {touched[name] && errors[name] && <span>{errors[name]}</span>}
      </div>
    );
  },
);

export default TextArea;
