import { classNames } from "@/utils/string";
import { UseFormRegisterReturn } from "react-hook-form";
import { useMemo } from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  register?: UseFormRegisterReturn;
}

export default function Textarea({
  className,
  error,
  register,
  ...rest
}: Props) {
  const baseClass =
    "bg-surface-soft outline-none placeholder:text-tertiary focus-visible:ring-[0.5px] w-full text-body-14 rounded-2xl min-w-72 h-12 p-4 text-primary border-none";
  const colorClass = useMemo(() => {
    return error ? "focus-visible:ring-error" : "focus-visible:ring-primary";
  }, [error]);
  return (
    <textarea
      className={classNames(baseClass, colorClass, className)}
      {...register}
      {...rest}
    />
  );
}
