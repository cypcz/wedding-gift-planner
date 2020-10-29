import { DetailedHTMLProps, forwardRef, TextareaHTMLAttributes } from "react";

type Props = {
  name: string;
  label?: string;
  errors: any;
  touched: any;
} & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

const TextArea: React.FC<Props> = forwardRef(
  ({ className, errors, touched, name, label, ...rest }, ref) => {
    return (
      <div className="flex flex-col mb-8">
        {label && <label className="font-corsiva text-center mb-2 text-2xl">{label}</label>}
        <textarea
          {...rest}
          name={name}
          ref={ref}
          className={`rounded-3xl border-solid border-secondary border-1 
          text-input outline-none px-4 py-2 placeholder-secondary ${className}`}
        />
        {touched[name] && errors[name] && (
          <span className="text-error text-sm text-center">{errors[name]}</span>
        )}
      </div>
    );
  }
);

export default TextArea;
