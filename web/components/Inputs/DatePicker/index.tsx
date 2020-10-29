import { DATE_TIME_FORMAT, TIME_FORMAT } from "@utils/constants";
import { default as LibDatePicker, ReactDatePickerProps } from "react-datepicker";

interface Props {
  name: string;
  label?: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => any;
  setFieldTouched: (
    field: string,
    touched?: boolean | undefined,
    shouldValidate?: boolean | undefined
  ) => any;
  errors: any;
  touched: any;
}

const DatePicker: React.FC<Omit<ReactDatePickerProps, "onChange"> & Props> = ({
  name,
  label,
  selected,
  setFieldValue,
  setFieldTouched,
  touched,
  errors,
  ...rest
}) => {
  return (
    <div className="flex flex-col mb-8">
      {label && <label className="font-corsiva text-center mb-2 text-2xl">{label}</label>}
      <LibDatePicker
        name={name}
        className="rounded-full border-solid border-secondary border-1 text-input outline-none h-10 pl-4 placeholder-secondary"
        dateFormat={DATE_TIME_FORMAT}
        timeFormat={TIME_FORMAT}
        timeIntervals={15}
        showTimeSelect
        placeholderText="Date and time"
        minDate={new Date()}
        selected={selected}
        onChange={(date) => {
          if (date) {
            setFieldValue(name, date);
            setFieldTouched(name);
          }
        }}
        {...rest}
      />
      {touched[name] && errors[name] && (
        <span className="text-error text-sm text-center">{errors[name]}</span>
      )}
    </div>
  );
};

export default DatePicker;
