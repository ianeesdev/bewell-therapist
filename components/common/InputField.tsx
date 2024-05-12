import React from "react";

interface InputFieldProps {
  type?: "text" | "email" | "password" | string;
  placeholder?: string;
  value: string;
  className?: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isTextArea?: boolean;
  rows?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  value,
  className,
  onChange,
  isTextArea = false,
  rows = 3, // Default rows for textarea
  ...rest
}) => {
  const InputComponent = isTextArea ? "textarea" : "input";

  return (
    <InputComponent
      rows={isTextArea ? rows : undefined}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-full w-full text-lg border border-gray-300 px-6 py-3 ${className}`}
      {...rest}
    />
  );
};

export default InputField;
