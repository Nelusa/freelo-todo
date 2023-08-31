import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodoList, TodoState } from "../helpers/types";
import { createSelector } from "reselect";
import { TodoList as TodoListType } from "../helpers/types";
import store from "./store";

const saveStateToLocalStorage = (state: TodoState) => {
  localStorage.setItem("todoLists", JSON.stringify(state.todoLists));
};

interface ShowFormTogglePayload {
  listId: number;
  show: boolean;
}

const initialState: TodoState = {
  todoLists: [],
  editedTodo: null,
  filtered: "",
  newTodos: [],
  selectedTodoListId: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    showFormToggle: (state, action: PayloadAction<ShowFormTogglePayload>) => {
      const { listId, show } = action.payload;
      const list = state.todoLists.find((list) => list.id === listId);
      if (list) {
        list.showFormToggle = show;
        saveStateToLocalStorage(state);
      }
    },
    loadTodoLists: (state) => {
      const todoLists = localStorage.getItem("todoLists");
      if (todoLists) {
        state.todoLists = JSON.parse(todoLists);
      } else {
        state.todoLists = [];
      }
    },
    changeCurrentTodoList: (_state, action: PayloadAction<number>) => {
      const selectedListId = action.payload;
      localStorage.setItem("currentTodoListId", selectedListId.toString());
    },

    filterTodosName: (state, action: PayloadAction<string>) => {
      state.filtered = action.payload;
    },

    addTodoList: (state, action: PayloadAction<TodoList>) => {
      state.todoLists.unshift(action.payload);
      saveStateToLocalStorage(state);
    },
    editTodoList: (
      state,
      action: PayloadAction<{ listId: number; updatedList: TodoList }>
    ) => {
      const { listId, updatedList } = action.payload;
      const list = state.todoLists.find((list) => list.id === listId);
      if (list) {
        list.listName = updatedList.listName;
        saveStateToLocalStorage(state);
      }
    },
    removeTodoList: (state, action: PayloadAction<number>) => {
      const listIndex = state.todoLists.findIndex(
        (list) => list.id === action.payload
      );
      if (listIndex !== -1) {
        state.todoLists.splice(listIndex, 1);
        saveStateToLocalStorage(state);
      }
    },
    createTodo: (
      state,
      action: PayloadAction<{ listId: number; todo: Todo }>
    ) => {
      const { listId, todo } = action.payload;
      const list = state.todoLists.find((list) => list.id === listId);
      if (list) {
        list.todos = [...list.todos, todo];
        saveStateToLocalStorage(state);
      }
    },
    setEditedTodo: (state, action: PayloadAction<Todo | null>) => {
      state.editedTodo = action.payload;
    },
    editTodo: (
      state,
      action: PayloadAction<{
        listId: number;
        todoId: number;
        updatedTodo: Todo;
      }>
    ) => {
      const { listId, todoId, updatedTodo } = action.payload;
      const list = state.todoLists.find((list) => list.id === listId);
      if (list) {
        const todo = list.todos.find((todo) => todo.id === todoId);
        if (todo) {
          todo.title = updatedTodo.title;
          todo.description = updatedTodo.description;
          state.editedTodo = updatedTodo;
          saveStateToLocalStorage(state);
        }
      }
    },
    markTodoAsFinished: (
      state,
      action: PayloadAction<{
        listId: number | undefined;
        todoId: number;
        status: "finished" | "in-progress";
      }>
    ) => {
      const { listId, todoId, status } = action.payload;
      const list = state.todoLists.find((list) => list.id === listId);
      if (list) {
        const todo = list.todos.find((todo) => todo.id === todoId);
        if (todo) {
          todo.status = status;
          saveStateToLocalStorage(state);
        }
      }
    },
    deleteTodo: (
      state,
      action: PayloadAction<{ listId: number; todoId: number }>
    ) => {
      const { listId, todoId } = action.payload;
      const list = state.todoLists.find((list) => list.id === listId);
      if (list) {
        const todoIndex = list.todos.findIndex((todo) => todo.id === todoId);
        if (todoIndex !== -1) {
          list.todos.splice(todoIndex, 1);
          saveStateToLocalStorage(state);
        }
      }
    },
    moveTodo: (
      state,
      action: PayloadAction<{
        sourceListId: number | undefined;
        destinationListId: number | undefined;
        todoId: number;
        targetTodoId: number;
      }>
    ) => {
      const { sourceListId, destinationListId, todoId, targetTodoId } =
        action.payload;

      const sourceList = state.todoLists.find(
        (list) => list.id === sourceListId
      );
      const destinationList = state.todoLists.find(
        (list) => list.id === destinationListId
      );

      if (sourceList && destinationList) {
        const draggedTodoIndex = sourceList.todos.findIndex(
          (todo) => todo.id === todoId
        );
        const targetTodoIndex = destinationList.todos.findIndex(
          (todo) => todo.id === targetTodoId
        );

        if (draggedTodoIndex !== -1 && targetTodoIndex !== -1) {
          const movedTodo = sourceList.todos.splice(draggedTodoIndex, 1)[0];
          destinationList.todos.splice(targetTodoIndex, 0, movedTodo);
          saveStateToLocalStorage(state);
        }
      }
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;

const selectTodoState = (state: RootState) => state.todos;

export const selectCurrentTodoList = createSelector(
  selectTodoState,
  (todoState) => {
    const currentTodoListId = localStorage.getItem("currentTodoListId");
    return (
      todoState.todoLists.find(
        (list: TodoListType) => list.id === Number(currentTodoListId!)
      ) || { id: Number(currentTodoListId!), todos: [] }
    );
  }
);

export const {
  showFormToggle,
  loadTodoLists,
  changeCurrentTodoList,
  filterTodosName,
  addTodoList,
  editTodoList,
  removeTodoList,
  createTodo,
  setEditedTodo,
  editTodo,
  markTodoAsFinished,
  deleteTodo,
  moveTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
