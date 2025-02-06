import { InputHTMLAttributes } from "react";
import cn from "classnames";

import "./input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
}

const baseClass = "input";

export const Input = (props: InputProps) => {
  const { error, className } = props;

  const fullClassName = cn(baseClass, {
    [`${baseClass}__error`]: error,
    className,
  });

  return (
    <div className={fullClassName}>
      <input
        {...props}
        placeholder={props.label}
        className={`${baseClass}__inner`}
      />
      <label htmlFor={props.name} className={`${baseClass}__label`}>
        {props.label}
      </label>
      {error && <span className={`${baseClass}__error`}>{error}</span>}
    </div>
  );
};
