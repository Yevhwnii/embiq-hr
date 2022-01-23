import React from "react";
import classNames from "classnames";

interface PaperProps {
  className?: string;
}

const Paper: React.FC<PaperProps> = ({ children, className }) => {
  return (
    <div className={classNames("bg-white p-2 rounded-lg shadow-lg", className)}>
      {children}
    </div>
  );
};

export default Paper;
