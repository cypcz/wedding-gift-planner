import { default as LibDatePicker, ReactDatePickerProps } from "react-datepicker";

const DatePicker: React.FC<ReactDatePickerProps> = ({ onChange, selected }) => {
  return (
    <div className="w-2/3 mx-auto mb-4">
      <LibDatePicker
        className="rounded-full border-solid border-secondary border-1 text-input outline-none my-1 h-10 pl-4 placeholder-secondary"
        dateFormat="MMMM d, yyyy HH:mm"
        timeFormat="HH:mm"
        timeIntervals={15}
        showTimeSelect
        placeholderText="Date and time"
        minDate={new Date()}
        selected={selected}
        onChange={onChange}
      />
    </div>
  );
};

export default DatePicker;
