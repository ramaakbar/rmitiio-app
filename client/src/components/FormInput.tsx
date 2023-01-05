import { forwardRef, HTMLInputTypeAttribute } from "react";
import { FieldError } from "react-hook-form";

type FormInputProps = {
  label: string;
  type: HTMLInputTypeAttribute | undefined;
  error: string | undefined;
};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  function Input({ label, type = "text", error, ...props }, ref) {
    return (
      <fieldset className="space-y-1">
        <label htmlFor={label} className="text-sm font-medium text-grey-700">
          {label}
        </label>
        <input
          {...props}
          type={type}
          ref={ref}
          className="block w-full rounded-md border border-gray-300 px-2 py-2 text-sm text-gray-700"
        />
        <span className="text-sm text-red-500">{error}</span>
      </fieldset>
    );
  }
);
