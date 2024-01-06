import React from "react";
import {
  UseFormRegister,
  FieldValues,
  FieldError,
  Merge,
  FieldErrorsImpl,
} from "react-hook-form";

interface InputSelectProps {
  label: string;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  register: UseFormRegister<FieldValues>;
  name: string;
  options: string[];
  selectClassName?: string;
  wrapClassName?: string;
  [rest: string]: any;
}
export const EventFormSelect: React.FC<InputSelectProps> = ({
  label,
  error,
  register,
  name,
  options,
  wrapClassName="w-2/4",
  ...rest
}) => (
  <div className={`flex flex-col ${wrapClassName}`}>
    <label className="space-y-2">
      <div>
        {label}
        {error && (
          <span className="text-red-500 pl-2 font-bold text-sm ">This field is required</span>
        )}
      </div>
      <select
        className={`border p-2 border-blue-400 rounded-full w-full`}
        {...register(name, { required: true })}
        {...rest}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  </div>
);

