import { cloneElement } from "react";

const Icon = ({
  children,
  strokeWidth,
  className,
  onClick,
  cursor = "cursor-pointer",
}: {
  children: React.ReactNode;
  strokeWidth?: number;
  className?: string;
  onClick?: () => void;
  cursor?: string;
}) => {
  const iconStyle = {
    width: "20px",
    height: "20px",
  };

  return (
    <div
      onClick={onClick}
      style={{ ...iconStyle, strokeWidth: `${strokeWidth}px` }}
      className={`${cursor} ${className}`}
    >
      {cloneElement(children as React.ReactElement, {
        strokeWidth: strokeWidth || 2,
      })}
    </div>
  );
};

export default Icon;
