import React from "react";

export function Card({ children, className }) {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
  );
}

export function CardContent({ children, className }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function Button({ children, variant = "default", className, ...props }) {
  const baseStyles = "px-4 py-2 rounded-lg font-semibold";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Separator({ className }) {
  return <hr className={`border-gray-300 ${className}`} />;
}
