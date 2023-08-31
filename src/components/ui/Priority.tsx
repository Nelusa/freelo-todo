import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Icon from "./Icon";
import { Todo } from "../../helpers/types";
import { Tooltip } from "react-tooltip";
import classNames from "../../helpers/classNames";

const Priority = ({
  todo,
  isDetail = false,
  isTablet = false,
}: {
  todo: Todo;
  isDetail?: boolean;
  isTablet?: boolean;
}) => {
  if (!isTablet) {
    return (
      <>
        <div
          className={classNames(
            "absolute w-1 h-[90%] rounded-r-lg md:hidden",
            todo.priority === "low"
              ? "bg-green-600"
              : todo.priority === "medium"
              ? "bg-yellow-500"
              : "bg-red-600"
          )}
          data-tooltip-id="priority"
          data-tooltip-content={
            todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)
          }
          data-tooltip-place="top"
        />
        <Tooltip id="priority" className="padding-container padding-tooltip " />
      </>
    );
  } else {
    return (
      <div
        className={classNames("text-xs hidden md:flex")}
        data-tooltip-id="priority"
        data-tooltip-content={
          todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)
        }
        data-tooltip-place="top"
      >
        <Icon
          cursor={classNames(
            "cursor-default",
            !isDetail ? "hidden md:block" : ""
          )}
        >
          <ExclamationTriangleIcon
            className={
              todo?.priority === "high"
                ? "text-red-600"
                : todo?.priority === "medium"
                ? "text-yellow-600"
                : "text-green-600"
            }
          />
        </Icon>
        <Tooltip id="priority" className="padding-container padding-tooltip " />
      </div>
    );
  }
};
export default Priority;
