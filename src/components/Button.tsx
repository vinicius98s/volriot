import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "success" | "danger" | "neutral" | "default";
};

export default function Button({
  className = "",
  variant = "default",
  ...props
}: Props) {
  const classNameVariant = {
    success: "hover:bg-green-700 bg-green-600",
    danger: "hover:bg-red-600 bg-red-500",
    default: "hover:bg-indigo-600 bg-indigo-500",
    neutral: "hover:bg-slate-600 bg-slate-500",
  }[variant];

  return (
    <button
      className={`px-3 py-1.5 rounded-md transition text-white text-sm font-bold ${className} ${classNameVariant}`}
      {...props}
    />
  );
}
