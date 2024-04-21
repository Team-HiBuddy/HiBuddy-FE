import SchoolSVG from "@assets/school.svg?react";
import PortalSVG from "@assets/portal.svg?react";
import ClubSVG from "@assets/club.svg?react";
import CalendarSVG from "@assets/calendar.svg?react";

function SchoolRelatedInfoBar() {
  return (
    <div className="flex gap-x-8 p-6 pb-0 overflow-x-auto">
      <a className="flex flex-col items-center w-16" href="https://eng.inha.ac.kr" target="_blank">
        <SchoolSVG />
        Homepage
      </a>
      <a
        className="flex flex-col items-center w-16"
        href="https://portal.inha.ac.kr"
        target="_blank"
      >
        <PortalSVG />
        Portal
      </a>
      <a
        className="flex flex-col items-center w-16"
        href="https://eng.inha.ac.kr/eng/3679/subview.do"
        target="_blank"
      >
        <CalendarSVG />
        Academic Calendar
      </a>
      <a
        className="flex flex-col items-center w-16"
        href="https://eng.inha.ac.kr/eng/3742/subview.do"
        target="_blank"
      >
        <ClubSVG />
        Clubs
      </a>
    </div>
  );
}

export default SchoolRelatedInfoBar;
