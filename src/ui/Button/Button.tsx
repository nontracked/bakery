import './Button.scss'
import React, {ButtonHTMLAttributes} from "react";
import {clsx} from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  label:string | React.ReactNode;
}

export const Button = ({className, label, ...props}: ButtonProps) => {
  return (
    <button
      className={clsx("button", className)}
      {...props}
    >
      {label}
    </button>
  )
}