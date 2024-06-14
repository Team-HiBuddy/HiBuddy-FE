import ThreadsSpriteSheet from "/spriteSheets/threads-sprite-sheet.svg";
import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  id: "bookmark" | "bookmark-outline" | "comment" | "thumbs-up" | "thumbs-up-fill";
  className?: string;
}

const ThreadsSVG = ({ id, className, ...rest }: Props) => (
  <svg className={className} {...rest}>
    <use href={`${ThreadsSpriteSheet}#${id}`} />
  </svg>
);

export default ThreadsSVG;
