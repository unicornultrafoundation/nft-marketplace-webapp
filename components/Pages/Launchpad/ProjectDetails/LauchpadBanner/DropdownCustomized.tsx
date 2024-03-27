import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { classNames } from "@/utils/string";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  activator: React.ReactNode;
  dropdown: React.ReactNode;
  dropdownContainerClass?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

export default function DropdownCustomized({
  className,
  dropdown,
  activator,
  dropdownContainerClass,
  open,
  setOpen,
  ...rest
}: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  const handler = (event: any) => {
    if (!container || !container.current || !dropdown) return;
    if (!container.current.contains(event.target)) {
      setShowDropdown(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  });

  return (
    <div
      className={classNames("relative", className)}
      onBlur={() => {
        setOpen(false);
        setShowDropdown(false);
      }}
      ref={container}
      {...rest}
    >
      <div
        className="cursor-pointer select-none"
        onClick={() => {
          setOpen(!open);
          setShowDropdown(!showDropdown);
        }}
      >
        {activator}
      </div>

      {!!dropdown && (
        <div
          onClick={() => {
            setOpen(false);
            setShowDropdown(false);
          }}
          className={classNames(
            "w-full min-w-fit px-5 py-3 rounded-lg absolute z-50 border-[0.5px] shadow-sm mt-1 transition-all bg-white max-h-96 overflow-auto",
            showDropdown ? "block" : "hidden",
            dropdownContainerClass,
          )}
        >
          {dropdown}
        </div>
      )}
    </div>
  );
}
