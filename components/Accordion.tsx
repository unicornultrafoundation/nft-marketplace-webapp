"use client";

import { useMemo, useState } from "react";
import { classNames } from "@/utils/string";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  header: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function Accordion({
  header,
  children,
  isOpen,
  onToggle,
  className,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false);
  const expanded = useMemo(() => isOpen ?? open, [isOpen, open]);

  const handleToggle = () => {
    if (onToggle) onToggle();
    else setOpen(!open);
  };

  return (
    <div className={classNames(`w-full`, className)} {...rest}>
      <div className="w-full p-4" onClick={handleToggle}>
        {header}
      </div>
      <div
        className={classNames(
          "w-full p-4 transition-all",
          expanded ? "block" : "hidden",
        )}
      >
        {children}
      </div>
    </div>
  );
}
