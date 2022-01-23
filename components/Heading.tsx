import classNames from "classnames";
import React from "react";

interface HeadingProps {
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ children, className = "" }) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-center md:heading ",
        className
      )}
    >
      <span className="text-center tracking-wider text-lg font-semibold">
        {children}
      </span>
    </div>
  );
};

export default Heading;
