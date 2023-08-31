import {
  PencilIcon,
  PlayIcon,
  TagIcon,
  ExclamationTriangleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Icon from "./ui/Icon";
import Checkbox from "./ui/Checkbox";
import { Todo } from "../helpers/types";
import { Link } from "react-router-dom";
import DueDate from "./ui/DueDate";
import Assignee from "./ui/Assignee";
import ActionsModal from "./ActionsModal";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  moveTodo,
  setEditedTodo,
  showFormToggle,
} from "../store/todoSlice";
import classNames from "../helpers/classNames";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
  onClick: () => void;
  onEditTask?: () => void;
  listId?: number;
}

const TodoItem = ({ todo, onClick, onEditTask, listId }: TodoItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [draggedOver, setDraggedOver] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    dispatch(
      deleteTodo({
        todoId: todo.id,
        listId: Number(listId),
      })
    );
  };

  const handleDragStart = (event: React.DragEvent<HTMLLIElement>) => {
    event.dataTransfer.setData("text/plain", todo.id.toString());
    setDraggedOver(true);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    setDraggedOver(true);
  };

  const handleDrop = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();

    const draggedTodoId = parseInt(
      event.dataTransfer.getData("text/plain"),
      10
    );

    if (draggedTodoId !== todo.id) {
      const sourceListId = listId;
      const destinationListId = listId;

      dispatch(
        moveTodo({
          sourceListId,
          destinationListId,
          todoId: draggedTodoId,
          targetTodoId: todo.id,
        })
      );
    }

    setDraggedOver(true);
  };

  return (
    <li
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={onClick}
      className={classNames(
        "flex justify-between md:justify-normal md:gap-5 items-center py-1.5 border-b border-gray-200 rounded",
        todo.priority === "low"
          ? "border-l-4 md:border-none border-l-green-600"
          : todo.priority === "medium"
          ? "border-l-4 md:border-none border-l-yellow-500"
          : "border-l-4 md:border-none border-l-red-600",
        draggedOver ? "cursor-grab" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-2 items-center">
        <Icon className="hidden md:block">
          <ExclamationTriangleIcon
            className={classNames(
              todo?.priority === "high"
                ? "text-red-600"
                : todo?.priority === "medium"
                ? "text-yellow-500"
                : "text-green-600"
            )}
          />
        </Icon>
        <Checkbox id="todo" todo={todo} listId={listId!} className="ml-2" />
        <Link to={`/task/${todo.id}`}>
          <h2
            className={classNames(
              "truncate hover:text-sky-800 text-sm",
              todo.status === "finished" ? "line-through text-gray-500" : ""
            )}
          >
            {todo.title}
          </h2>{" "}
        </Link>
      </div>
      <div className="flex gap-2 items-center text-xs">
        <Assignee todo={todo} />
        <DueDate todo={todo} />
        <ActionsModal
          className="md:hidden"
          onEditTask={onEditTask}
          onDeleteTask={handleDeleteTask}
          listId={listId}
        />
      </div>
      {isHovered && (
        <div className=" text-zinc-400 gap-1.5 hidden lg:flex lg:flex-col lg:ml-2 ">
          <EllipsisVerticalIcon className="w-5 h-5 self-end lg:hidden" />
          <div className="flex gap-2">
            <Icon>
              <PlayIcon className="cursor-not-allowed" />
            </Icon>
            <Icon
              onClick={() => {
                dispatch(setEditedTodo(todo));
                dispatch(showFormToggle({ listId: listId!, show: true }));
              }}
            >
              <PencilIcon />
            </Icon>
            <Icon>
              <TagIcon className="cursor-not-allowed" />
            </Icon>
            <Icon
              onClick={() => {
                dispatch(
                  deleteTodo({
                    todoId: todo.id,
                    listId: Number(listId),
                  })
                );
              }}
            >
              <TrashIcon />
            </Icon>
          </div>
        </div>
      )}
    </li>
  );
};
export default TodoItem;
