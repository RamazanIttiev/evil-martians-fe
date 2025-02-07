import { InputHTMLAttributes, useCallback, useState } from "react";
import { IconButton } from "../icon-button/icon-button.tsx";

import cn from "classnames";

import IconEyeOpened from "../../../../assets/icons/icon-eye-opened.svg";
import IconEyeClosed from "../../../../assets/icons/icon-eye-closed.svg";

import "./input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const baseClass = "input";

export const Input = (props: InputProps) => {
  const { error } = props;

  const [passwordVisible, setPasswordVisible] = useState(false);

  const isPassword = props.type === "password";

  const togglePassword = useCallback(() => {
    setPasswordVisible((prevState) => !prevState);
  }, []);

  const inputClassNames = cn(`${baseClass}__inner`, {
    [`${baseClass}__inner_right-padding`]: isPassword,
  });

  const wrapperClassNames = cn(`${baseClass}__wrapper`, {
    [`${baseClass}__wrapper_isInvalid`]: error,
  });

  return (
    <div className={baseClass}>
      <label htmlFor={props.name} className={`${baseClass}__label`}>
        {props.label}
      </label>
      <div className={wrapperClassNames}>
        <input
          {...props}
          aria-errormessage={error}
          aria-invalid={error ? true : undefined}
          className={inputClassNames}
        />
        {isPassword && (
          <IconButton
            className={`${baseClass}__password-icon`}
            onClick={togglePassword}
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            icon={passwordVisible ? <IconEyeOpened /> : <IconEyeClosed />}
          />
        )}
      </div>
      {error && <span className={`${baseClass}__error`}>{error}</span>}
    </div>
  );
};
