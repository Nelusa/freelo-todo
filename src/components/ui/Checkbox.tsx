import { useDispatch } from "react-redux";
import classNames from "../../helpers/classNames";
import { CheckIcon } from "@heroicons/react/24/outline";
import { markTodoAsFinished } from "../../store/todoSlice";
import { Todo } from "../../helpers/types";

type Props = {
  id: string;
  todo: Todo;
  listId: number;
  disabled?: boolean;
  className?: string;
  checked?: boolean;
  onChange?: () => void;
};

const Checkbox = ({ id, disabled = false, className, todo, listId }: Props) => {
  const dispatch = useDispatch();

  return (
    <div className={classNames(" items-center", className!)}>
      <label className={classNames("relative flex items-center")} htmlFor={id}>
        <input
          id={id}
          name="type"
          type="checkbox"
          disabled={disabled}
          className={classNames(
            "relative rounded-[4px] h-5 w-5 focus:[&:not(:focus-visible)]:ring-1 focus:ring-sky-500 checked:ring-1 checked:ring-sky-500 checked:bg-sky-500 peer appearance-none  border checked:border-none transition-all focus:[&:not(:focus-visible)]:ring-offset-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-500 focus:border-sky-500",
            disabled
              ? "border-gray-300 cursor-not-allowed"
              : "border-gray-400 cursor-pointer"
          )}
          checked={todo.status === "finished"}
          onChange={() => {
            if (todo.status === "finished") {
              dispatch(
                markTodoAsFinished({
                  listId: listId,
                  todoId: todo.id,
                  status: "in-progress",
                })
              );
            } else {
              dispatch(
                markTodoAsFinished({
                  listId: listId,
                  todoId: todo.id,
                  status: "finished",
                })
              );
            }
          }}
        />
        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-0 peer-focus:opacity-0 [&:not(checked)]:peer-checked:opacity-100">
          <CheckIcon width={16} strokeWidth={3} />
        </div>
      </label>
    </div>
  );
};

export default Checkbox;
