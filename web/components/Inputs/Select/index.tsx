import { DetailedHTMLProps, forwardRef, SelectHTMLAttributes } from "react";

interface Option {
  label: string;
  value: string;
}

type Props = {
  name: string;
  label?: string;
  options: Option[];
} & DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

const Select: React.FC<Props> = forwardRef(
  ({ name, options, label, ...rest }, ref) => {
    return (
      <div>
        {label && <label>{label}</label>}
        <select name={name} ref={ref} {...rest}>
          {options.map((option, index) => (
            <option key={index}>{option.label}</option>
          ))}
        </select>
      </div>
    );
  },
);

export default Select;
