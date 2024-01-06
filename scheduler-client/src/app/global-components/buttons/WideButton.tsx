import { on } from "events";
import React from "react";
interface WideButtonProps {
  onClick: () => void;
  className?: string;
  buttonText?: string;
  [rest: string]: any;
}
export default function WideButton({
  onClick,
  className,
  buttonText,
}: WideButtonProps) {
  return (
    <div className={className}>
      <button
        onClick={onClick}
        className="bg-blue-500 
        ease-in-out 
        duration-200 
        hover:scale-110
        text-white 
        font-bold 
        py-2 
        px-4 
        rounded"
      >
        {buttonText?.toString()}
      </button>
    </div>
  );
}
