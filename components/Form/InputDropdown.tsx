import React, { useEffect, useRef, useState } from "react";
import Input, { BaseInputProps } from "@/components/Form/Input";
import { classNames } from "@/utils/string";
import { Spinner } from "flowbite-react";

interface Props extends BaseInputProps {
  closeOnClick?: boolean;
  className?: string;
  loading?: boolean;
  renderDropdown?: (onClose: () => void) => React.ReactNode;
}

export default function InputDropdown({
  className,
  loading,
  closeOnClick,
  renderDropdown,
  ...rest
}: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  const handleClose = () => setShowDropdown(false);

  const handler = (event: any) => {
    if (!container || !container.current || !renderDropdown) return;
    if (!container.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  });

  return (
    <div className={classNames("relative", className)} ref={container}>
      <Input
        {...rest}
        onFocus={() => !!renderDropdown && setShowDropdown(true)}
      />

      {!!renderDropdown && (
        <div
          className={classNames(
            "w-full desktop:p-3 tablet:p-2 desktop:rounded-2xl tablet:rounded-2xl absolute z-50 desktop:border-[0.5px] tablet:border-0 shadow-sm mt-3 transition-all bg-white desktop:max-h-200 tablet:max-h-200 max-h-auto overflow-auto",
            showDropdown ? "block" : "hidden",
          )}
        >
          {loading ? (
            <div className="flex flex-col justify-center items-center">
              <Spinner size="xl" />
            </div>
          ) : (
            renderDropdown(handleClose)
          )}
        </div>
      )}
    </div>
  );
}
