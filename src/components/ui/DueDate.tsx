import { format, getYear, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { Tooltip } from "react-tooltip";
import { Todo } from "../../helpers/types";

interface DueDateProps {
  todo: Todo;
}

const DueDate = ({ todo }: DueDateProps) => {
  const date = parseISO(todo.date);
  const dayInWeek = format(date, "iiii", { locale: enUS });
  const dayInMonth = format(date, "d", { locale: enUS });
  const year = getYear(date);
  const shortenedMonth = format(date, "MMM", { locale: enUS });

  const fullDate = `
    ${dayInWeek}, ${dayInMonth} ${format(date, "MMMM", {
    locale: enUS,
  })}, ${year} at ${todo.time}
  `;

  return (
    <>
      <div
        className="flex flex-col leading-3 text-center cursor-default"
        data-tooltip-id="dueDate"
        data-tooltip-content={fullDate}
        data-tooltip-place="top"
      >
        <div className="bg-sky-600 text-white px-[3px] font-light rounded-t-sm border-sky-600 pb-0.5 ">
          {shortenedMonth}
        </div>
        <div className="px-0.5 text-[10px]  border-b border-x border-gray-200 rounded-b-sm font-semibold">
          {dayInMonth}
        </div>
      </div>
      <Tooltip id="dueDate" className="padding-container padding-tooltip " />
    </>
  );
};
export default DueDate;
