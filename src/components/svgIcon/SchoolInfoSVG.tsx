import SchoolInfoSpriteSheet from "@assets/school-info-sprite-sheet.svg";

interface Props {
  id: "calendar" | "club" | "portal" | "school";
  className?: string;
}

const SchoolInfoSVG = ({ id, className }: Props) => (
  <svg className={className}>
    <use href={`${SchoolInfoSpriteSheet}#${id}`} />
  </svg>
);

export default SchoolInfoSVG;
