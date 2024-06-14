import LayoutSpriteSheet from "/spriteSheets/layout-sprite-sheet.svg";
import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  id: "home" | "profile" | "search" | "thread" | "recorder";
  className?: string;
}

const LayoutSVG = ({ id, className, ...rest }: Props) => (
  <svg className={className} {...rest}>
    <use href={`${LayoutSpriteSheet}#${id}`} />
  </svg>
);

export default LayoutSVG;
