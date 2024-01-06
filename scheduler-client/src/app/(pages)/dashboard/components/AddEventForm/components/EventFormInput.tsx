import {
  UseFormRegister,
  FieldValues,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

interface InputFieldProps {
  label: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  register: UseFormRegister<FieldValues>;
  name: string;
  className?: string;
  labelClassName?: string;
  onChange?: any;
  textarea?: boolean;
  [rest: string]: any;
}

export const EventFormInput: React.FC<InputFieldProps> = ({
  label,
  error,
  register,
  name,
  className = "",
  inputClassName = "",
  onChange,
  textarea,
  ...rest
}) => {
  const props = {
    className: `border p-2 border-blue-400  rounded-lg w-full ${inputClassName}`,
    ...register(name, { required: true }),
    ...rest,
  };

  return (
    <label className="space-y-2">
      <div>
        {label}
        {error && (
          <span className="text-red-500 pl-2 text-sm font-semibold">
            This field is required
          </span>
        )}
      </div>
      {textarea ? <textarea {...props} /> : <input {...props} />}
    </label>
  );
};
