import { PencilIcon, PlayIcon, TagIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Icon from "./ui/Icon";
import Checkbox from "./ui/Checkbox";
import { Todo } from "../helpers/types";
import { useNavigate, useParams } from "react-router-dom";
import Assignee from "./ui/Assignee";
import DueDate from "./ui/DueDate";
import { useDispatch, useSelector } from "react-redux";
import { TodoList as TodoListType } from "../helpers/types";
import {
  RootState,
  editTodo,
  selectCurrentTodoList,
  setEditedTodo,
  showFormToggle,
} from "../store/todoSlice";
import EditForm from "./forms/EditForm";
import classNames from "../helpers/classNames";
import Priority from "./ui/Priority";

const TodoDetail = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const editedTodo = useSelector((state: RootState) => state.todos.editedTodo);
  const currentTodoList = useSelector(selectCurrentTodoList);

  const todos = currentTodoList.todos;
  const listId = currentTodoList.id;

  const todoList = useSelector((state: RootState) =>
    state.todos.todoLists.find((list: TodoListType) => list.id === listId)
  );
  const todo = todos.find((todo: Todo) => todo.id === Number(taskId));

  const showForm = todoList?.showFormToggle || false;

  const handleEditTask = (updatedTodo: Todo) => {
    dispatch(setEditedTodo(updatedTodo));
    dispatch(showFormToggle({ listId: listId, show: true }));

    dispatch(
      editTodo({
        listId: listId,
        todoId: updatedTodo.id,
        updatedTodo: updatedTodo,
      })
    );
  };

  if (!todo) return;

  return showForm ? (
    <EditForm
      onShowForm={() => {
        dispatch(showFormToggle({ listId: listId, show: false }));
      }}
      editedTodo={editedTodo!}
      onEditTask={handleEditTask}
    />
  ) : (
    <>
      <li className="flex justify-between items-center lg:justify-normal">
        <EllipsisVerticalIcon className="w-5 h-5 hidden lg:block lg:mr-3 text-zinc-400" />
        <div className="flex gap-2 lg:items-center">
          <Checkbox id="todo" todo={todo} listId={listId} />
          <div className="flex flex-col lg:flex-row  gap-1 lg:gap-2 lg:items-center">
            <h2
              className={classNames(
                "truncate hover:text-sky-800 text-base md:text-lg",
                todo.status === "finished" ? "line-through text-gray-500" : ""
              )}
            >
              {todo.title}
            </h2>
            <div className="flex gap-2 items-center text-xs">
              <Assignee todo={todo} />
              <div className="flex flex-col leading-3 text-center">
                <DueDate todo={todo} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col text-zinc-400 gap-1.5 lg:ml-5">
          <EllipsisVerticalIcon className="w-5 h-5 self-end lg:hidden" />
          <div className="flex gap-2">
            <Icon>
              <PlayIcon className="cursor-not-allowed" />
            </Icon>
            <Icon
              onClick={() => {
                dispatch(setEditedTodo(todo));
                dispatch(showFormToggle({ listId: listId, show: true }));
              }}
            >
              <PencilIcon />
            </Icon>
            <Icon>
              <TagIcon className="cursor-not-allowed" />
            </Icon>
            <Priority todo={todo} isDetail={true} />
          </div>
        </div>
      </li>
      <button
        className="mt-10 bg-white border border-gray-300 px-3 py-1.5 rounded-md text-sm"
        onClick={() => navigate(-1)}
      >
        👈🏼 Back to all lists
      </button>
    </>
  );
};
export default TodoDetail;
