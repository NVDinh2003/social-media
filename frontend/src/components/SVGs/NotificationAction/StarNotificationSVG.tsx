import { SVGProps } from "../../../utils/GlobalInterface";

export default function StarNotificationSVG(props: SVGProps) {
  // Thêm dòng này để kiểm tra giá trị của props
  return (
    <svg
      viewBox="0 0 512 512" // Thay đổi viewBox để phù hợp với kích thước của path
      aria-hidden="true"
      height={props.height}
      width={props.width}
    >
      <g>
        <path
          fill={props.color ? props.color : "#000"}
          d="m256 85.777 50.061 101.434L418 203.477l-81 78.956 19.121 111.486L256 341.282l-100.122 52.637L175 282.433l-81-78.956 111.939-16.266z"
        ></path>
      </g>
    </svg>
  );
}
