import React, { useState } from "react";
import Text from "./index";

interface ShowMoreProps {
  text: string;
  maxLength: number;
  containerClass?: string;
  mainTextClass?: string;
  toggleClass?: string;
}

export default function CollapsibleText({
  text,
  maxLength,
  mainTextClass = "",
  containerClass = "",
  toggleClass = "cursor-pointer text-sm hover:underline",
}: ShowMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded ? text : text.slice(0, maxLength);

  return (
    <div className={containerClass}>
      <Text className={mainTextClass}>
        {displayText}
        {!isExpanded && text.length > maxLength && "..."}
      </Text>

      {text.length > maxLength && (
        <Text className={toggleClass} onClick={toggleText}>
          {isExpanded ? "Show Less" : "Show More"}
        </Text>
      )}
    </div>
  );
}
