import { SVGProps } from "../../../utils/GlobalInterface";

export default function PlayGifSVG(props: SVGProps) {
  return (
    <svg
      viewBox="0 0 60 61"
      aria-hidden="true"
      height={props.height}
      width={props.width}
    >
      <g>
        <path
          fill={props.color ? props.color : "#000"}
          d="M22.2275 17.1971V43.6465L43.0304 30.4218L22.2275 17.1971Z"
        ></path>
      </g>
    </svg>
  );
}
