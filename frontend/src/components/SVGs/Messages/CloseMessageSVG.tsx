import { SVGProps } from "../../../utils/GlobalInterface";

export default function CloseMessageSVG(props: SVGProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      height={props.height}
      width={props.width}
    >
      <g>
        <path
          fill={props.color ? props.color : "#000"}
          //   d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z"
          d="M12 11.59L3.96 3.54 2.54 4.96 12 14.41l9.46-9.45-1.42-1.42L12 11.59zm0 7l-8.04-8.05-1.42 1.42L12 21.41l9.46-9.45-1.42-1.42L12 18.59z"
        ></path>
      </g>
    </svg>
  );
}
