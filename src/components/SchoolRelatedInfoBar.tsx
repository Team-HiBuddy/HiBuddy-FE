import SchoolInfoSVG from "./svgIcon/SchoolInfoSVG";

function SchoolRelatedInfoBar() {
  return (
    <div className="flex gap-x-8 p-4 pb-0 overflow-x-auto">
      <a className="flex flex-col items-center w-16" href="https://eng.inha.ac.kr" target="_blank">
        <SchoolInfoSVG id="school" className="w-8 h-8" />
        Homepage
      </a>
      <a
        className="flex flex-col items-center w-16"
        href="https://portal.inha.ac.kr"
        target="_blank"
      >
        <SchoolInfoSVG id="portal" className="w-8 h-8" />
        Portal
      </a>
      <a
        className="flex flex-col items-center w-16"
        href="https://eng.inha.ac.kr/eng/3679/subview.do"
        target="_blank"
      >
        <SchoolInfoSVG id="calendar" className="w-8 h-8" />
        Academic Calendar
      </a>
      <a
        className="flex flex-col items-center w-16"
        href="https://eng.inha.ac.kr/eng/3742/subview.do"
        target="_blank"
      >
        <SchoolInfoSVG id="club" className="w-8 h-8" />
        Clubs
      </a>
    </div>
  );
}

export default SchoolRelatedInfoBar;
