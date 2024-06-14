import LayoutSpriteSheet from "@assets/layout-sprite-sheet.svg";

interface Props {
  id: "home" | "profile" | "search" | "thread" | "recorder";
  className?: string;
}

const LayoutSVG = ({ id, className }: Props) => (
  <svg className={className}>
    <use href={`${LayoutSpriteSheet}#${id}`} />
  </svg>
);

export default LayoutSVG;
