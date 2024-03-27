"use client";

import { classNames } from "@/utils/string";
import { typography } from "@/config/theme";
import { Tooltip } from "flowbite-react";

type VariantType = keyof typeof typography;
interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: VariantType;
  showTooltip?: boolean;
  labelTooltip?: string | null;
}

export default function Text({
  className,
  variant,
  showTooltip,
  children,
  labelTooltip,
  ...rest
}: Props) {
  if (variant?.includes("heading")) {
    return (
      <h1 className={classNames(className, `text-${variant}`)} {...rest}>
        {children}
      </h1>
    );
  }

  if (showTooltip) {
    return (
      <Tooltip content={labelTooltip} placement="bottom">
        <p
          className={classNames(
            className,
            `text-${variant || "body-14"}, text-ellipsis break-all whitespace-nowrap overflow-hidden`,
          )}
          {...rest}
        >
          {children}
        </p>
      </Tooltip>
    );
  }

  return (
    <p
      className={classNames(className, `text-${variant || "body-14"}`)}
      {...rest}
    >
      {children}
    </p>
  );
}
