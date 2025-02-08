import React from "react";
import cn from "classnames";

import "./icon-button.css";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

const baseClass = "icon-button";

export const IconButton = (props: IconButtonProps) => {
  const { icon, ...buttonProps } = props;

  const classNames = cn(baseClass, props.className);

  return (
    <button {...buttonProps} className={classNames} type="button">
      {icon}
    </button>
  );
};
