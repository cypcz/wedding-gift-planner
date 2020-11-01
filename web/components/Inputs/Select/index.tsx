import { DetailedHTMLProps, forwardRef, SelectHTMLAttributes } from "react";

interface Option {
  label: string;
  value: string;
}

type Props = {
  name: string;
  label?: string;
  options: Option[];
} & DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

const Select: React.FC<Props> = forwardRef(({ className, name, options, label, ...rest }, ref) => {
  return (
    <div className="flex flex-col mb-8">
      {label && <label className="font-corsiva text-center mb-2 text-2xl">{label}</label>}
      <select
        name={name}
        ref={ref}
        className={`rounded-full border-solid border-secondary border-1 
        text-input outline-none h-10 pl-4 placeholder-secondary ${className}`}
        {...rest}
      >
        {options.map((option, index) => (
          <option key={index}>{option.label}</option>
        ))}
      </select>
    </div>
  );
});

export default Select;
