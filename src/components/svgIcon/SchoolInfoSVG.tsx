import SchoolInfoSpriteSheet from "/spriteSheets/school-info-sprite-sheet.svg";
import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  id: "calendar" | "club" | "portal" | "school";
  className?: string;
}

const SchoolInfoSVG = ({ id, className, ...rest }: Props) => (
  <svg className={className} {...rest}>
    <use href={`${SchoolInfoSpriteSheet}#${id}`} />
  </svg>
);

export default SchoolInfoSVG;
