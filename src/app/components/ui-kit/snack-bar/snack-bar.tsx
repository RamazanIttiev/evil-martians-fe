import React from "react";

import "./snack-bar.css";

interface SnackBarProps {
  children: React.ReactNode;
}

export const SnackBar = (props: SnackBarProps) => {
  const { children } = props;

  return <div className="snack-bar">{children}</div>;
};
