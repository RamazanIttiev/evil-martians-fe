import { ButtonHTMLAttributes } from "react";
import cn from "classnames";

import IconLoading from "../../../../assets/icons/icon-loading.svg";

import "./button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const baseClassName = "button";

export const Button = (props: ButtonProps) => {
  const { loading, disabled, children, ...restProps } = props;

  const classes = cn(baseClassName, {
    [`${baseClassName}_loading`]: loading,
    [`${baseClassName}_disabled`]: disabled,
  });

  return (
    <button
      aria-disabled={disabled || loading}
      className={classes}
      disabled={disabled || loading}
      {...restProps}
    >
      <span className={`${baseClassName}__content`}>{children}</span>
      {loading && (
        <span className={`${baseClassName}__loader`}>
          <IconLoading />{" "}
        </span>
      )}
    </button>
  );
};
