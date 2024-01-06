import { IconButtonProps } from "../IconButton";

export interface SvgIconProps {
  iconColor?: string;
  hoverColor?: string;
  [rest: string]: any;
}

export const PenSvg = ({
  iconColor = "text-blue-300",
  hoverColor = "hover:text-teal-300",
}: SvgIconProps) => (
  <svg
    className={`h-5 w-5 transform hover:scale-150 transition-transform duration-50 ${iconColor} ${hoverColor} `}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
);
export const CrossSvg = ({
  iconColor = "text-orange-300",
  hoverColor = "text-red-300",
}: SvgIconProps) => (
  <svg
    className={`h-5 w-5 transform hover:scale-150 transition-transform duration-50 ${iconColor} ${hoverColor} `}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <circle cx="12" cy="12" r="10" /> <line x1="15" y1="9" x2="9" y2="15" />{" "}
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);
