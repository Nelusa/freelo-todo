import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Todo, TodoList as TodoListType } from "../helpers/types";
import TodoItem from "./TodoItem";
import { useState } from "react";
import TodoForm from "./forms/TodoForm";
import {
  changeCurrentTodoList,
  createTodo,
  editTodo,
  editTodoList,
  removeTodoList,
  setEditedTodo,
  showFormToggle,
  RootState,
} from "../store/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import EditForm from "./forms/EditForm";
import EmptyState from "./states/EmptyState";

interface TodoListProps {
  listName: string;
  listId: number;
}

const TodoList = ({ listName, listId }: TodoListProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [editedTodoList, setEditedTodoList] = useState<TodoListType | null>(
    null
  );

  const todoList = useSelector((state: RootState) =>
    state.todos.todoLists.find((list: TodoListType) => list.id === listId)
  );
  const editedTodo = useSelector((state: RootState) => state.todos.editedTodo);
  const newTodos = todoList?.todos || [];

  const dispatch = useDispatch();
  const showForm = todoList?.showFormToggle || false;

  const handleAddTask = (newTodo: Todo) => {
    dispatch(
      createTodo({
        listId: listId,
        todo: newTodo,
      })
    );

    dispatch(showFormToggle({ listId: listId, show: false }));
  };

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

  const handleTodoListClick = () => {
    dispatch(changeCurrentTodoList(listId));
  };

  const handleEditList = () => {
    dispatch(
      editTodoList({
        listId,
        updatedList: {
          ...todoList,
          listName: editedTodoList?.listName || "",
          id: listId,
          todos: todoList?.todos || [],
        },
      })
    );
    setEditedTodoList(null);
  };

  const filtered = useSelector((state: RootState) => state.todos.filtered);
  const filteredTodos = newTodos.filter((todo: Todo) => {
    return todo.title.toLowerCase().includes(filtered.toLowerCase());
  });

  return (
    <div>
      <div
        className="flex items-center mb-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {editedTodoList === null ? (
          <h1 className="text-sky-600 font-medium text-base">{listName}</h1>
        ) : (
          <input
            type="text"
            value={editedTodoList !== null ? editedTodoList.listName : listName}
            onChange={(e) =>
              setEditedTodoList({
                ...editedTodoList,
                listName: e.target.value,
              })
            }
            onBlur={handleEditList}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEditList();
              }
            }}
            className="border-b-2 border-sky-600 focus:outline-none"
          />
        )}
        {editedTodoList === null && isHovered && (
          <div className="flex items-center gap-1">
            <PencilIcon
              className="w-3.5 h-3.5 text-gray-500 ml-2 cursor-pointer"
              onClick={() =>
                setEditedTodoList({
                  ...todoList,
                  id: listId,
                  todos: todoList?.todos || [],
                  listName: listName,
                })
              }
            />
            <TrashIcon
              onClick={() => dispatch(removeTodoList(listId))}
              className="w-3.5 h-3.5 text-gray-500 hover:cursor-pointer"
            />
          </div>
        )}
      </div>
      {newTodos.length === 0 ? (
        <EmptyState message="Start adding some todos! ✏️" />
      ) : (
        <ul className="flex flex-col mb-5">
          {filteredTodos.map((todo: Todo) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                listId={listId}
                onClick={handleTodoListClick}
                onEditTask={() => handleEditTask(todo)}
              />
            );
          })}
        </ul>
      )}
      {!showForm && (
        <button
          onClick={() =>
            dispatch(showFormToggle({ listId: listId, show: true }))
          }
          className="flex items-center gap-2 text-sm mt-3 border border-gray-300 rounded-md px-3 py-1"
        >
          <PlusIcon className="w-4 h-4 text-gray-500" strokeWidth={5} />
          <span>Add task</span>
        </button>
      )}

      {showForm &&
        (!editedTodo ? (
          <TodoForm
            onShowForm={() => {
              dispatch(showFormToggle({ listId: listId, show: false }));
              dispatch(setEditedTodo(null));
            }}
            onAddTask={handleAddTask}
          />
        ) : (
          <EditForm
            onShowForm={() => {
              dispatch(showFormToggle({ listId: listId, show: false }));
            }}
            onEditTask={handleEditTask}
            editedTodo={editedTodo!}
          />
        ))}
    </div>
  );
};
export default TodoList;
