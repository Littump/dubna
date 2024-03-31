import { useField } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({ name = "", label = "" }) => {
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  return (
    <label className={`form-control relative w-full `}>
      {label !== "" && (
        <div className="label">
          <span className="label-text font-semibold prose-sm">{label}</span>
        </div>
      )}
      <DatePicker
        className={`input input-bordered text-md border-blue w-full text-md`}
        {...field}
        selected={value}
        onChange={(date) => setValue(date)}
      />
    </label>
  );
};

export default DateInput;
