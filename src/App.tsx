import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import { TodoList as TodoListType } from "./helpers/types";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  addTodoList,
  filterTodosName,
  loadTodoLists,
} from "./store/todoSlice";
import ListForm from "./components/forms/ListForm";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import Icon from "./components/ui/Icon";
import EmptyState from "./components/states/EmptyState";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const todoLists = useSelector((state: RootState) => state.todos.todoLists);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodoLists());
  }, [dispatch, todoLists.length]);

  const handleAddList = (newList: TodoListType) => {
    dispatch(addTodoList(newList));
    setShowForm(false);

    localStorage.setItem("currentTodoListId", newList.id.toString());
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterTodosName(event.target.value));
  };

  return (
    <>
      <div className="mb-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-xl text-red-700 font-normal">
              All To-Do lists
            </h1>
            <Icon
              strokeWidth={3}
              className="bg-green-500 p-1 rounded-md"
              onClick={() => setShowForm(true)}
            >
              <PlusIcon className="text-white" />
            </Icon>
          </div>
          <div className="relative">
            <Icon onClick={() => setShowFilter(!showFilter)}>
              <MagnifyingGlassIcon />
            </Icon>
          </div>
        </div>
        {showFilter && (
          <input
            type="text"
            placeholder="Search by todo name"
            className="border border-gray-300 rounded-md px-3 py-1 self-end w-full mt-3 placeholder:text-sm  focus:outline-sky-500"
            onChange={handleFilterChange}
          />
        )}

        {showForm && (
          <ListForm
            onShowForm={() => setShowForm(false)}
            onAddList={handleAddList}
          />
        )}
      </div>
      {todoLists.length === 0 && !showForm ? (
        <EmptyState message="Start adding some lists! 📄" />
      ) : (
        <div className="flex flex-col gap-10">
          {todoLists.map((todoList: TodoListType) => {
            return (
              <TodoList
                key={todoList.id}
                listName={todoList?.listName || ""}
                listId={todoList.id}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
