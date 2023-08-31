import { Tooltip } from "react-tooltip";
import { Todo } from "../../helpers/types";

interface AssigneeProps {
  todo: Todo;
}

const Assignee = ({ todo }: AssigneeProps) => {
  const initials = todo.assignee
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <>
      <div
        className="flex justify-center items-center rounded-full bg-zinc-400 border-2 border-sky-600 text-white  font-bold p-1 "
        data-tooltip-id="assignee"
        data-tooltip-content={todo.assignee}
        data-tooltip-place="top"
      >
        {initials}
      </div>
      <Tooltip id="assignee" className="padding-container padding-tooltip " />
    </>
  );
};
export default Assignee;
