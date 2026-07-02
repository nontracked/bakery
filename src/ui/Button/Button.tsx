import './Button.scss'
import {ButtonHTMLAttributes} from "react";
import {clsx} from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  label: string;
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