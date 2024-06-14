import LayoutSpriteSVG from "@assets/layout-sprite-sheet.svg";

interface Props {
  id: "home" | "profile" | "search" | "thread" | "recorder";
  className?: string;
}

const LayoutSVG = ({ id, className }: Props) => (
  <svg className={className}>
    <use href={`${LayoutSpriteSVG}#${id}`} />
  </svg>
);

export default LayoutSVG;
