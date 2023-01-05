import { ComponentPropsWithoutRef } from "react";

type CloseIconProps = ComponentPropsWithoutRef<"div">;

export default function CloseIcon(props: CloseIconProps) {
  return (
    <div
      className="flex items-center text-grey-500 hover:text-grey-700"
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}
