import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
};

export default function Input({ className = "", label, id, ...props }: Props) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="text-white text-sm mb-1">
          {label}
        </label>
      )}

      <input
        id={id}
        className={`px-3 py-1.5 rounded-md focus:border-indigo-600 border-indigo-300 border-2 ${className}`}
        {...props}
      />
    </div>
  );
}
