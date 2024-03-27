"use client";

import Icon from "@/components/Icon";
import Text from "@/components/Text";
import { useMemo } from "react";
import { classNames } from "@/utils/string";

interface Step {
  value: number;
  label?: string;
  icon?: string;
}

interface StepsProps {
  current?: number;
  steps: Step[];
  onNext?: () => void;
}

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  step: Step;
  active?: boolean;
}

const Step = ({ step: { label, icon, value }, active, ...rest }: StepProps) => {
  return (
    <>
      <div
        className={classNames(
          "w-7 h-7 rounded-full flex items-center justify-center",
          active ? "bg-success" : "bg-blue-300",
        )}
        {...rest}
      >
        {!!icon ? (
          <Icon name={icon} width={19} height={19} />
        ) : (
          <Text className="text-white" variant="body-12">
            {value}
          </Text>
        )}
      </div>
      {!!label && <Text className="flex">{label}</Text>}
    </>
  );
};

export default function Stepper({ current = 0, steps }: StepsProps) {
  const hasLabel = useMemo(() => steps.some((step) => !!step.label), [steps]);

  return (
    <div className={classNames("flex items-center gap-2", hasLabel && "mb-6")}>
      {steps.map((item, index) => {
        const isActive = current === item.value;
        const isCompleted = item.value < current;
        return (
          <>
            <Step active={isCompleted} step={item} key={item.value} />
            {index < steps.length - 1 && (
              <div
                key={`${item.value}-${index}`}
                className={classNames(
                  "w-[100px] h-[2px]",
                  isCompleted ? "bg-success" : "bg-blue-300",
                )}
              />
            )}
          </>
        );
      })}
    </div>
  );
}
