import { useState } from "react";
import { TodoList } from "../../helpers/types";
import FormWrapper from "./FormWrapper";
import FormActions from "./FormActions";

interface FormProps {
  onShowForm: () => void;
  onAddList: (newList: TodoList) => void;
}

const ListForm = ({ onShowForm, onAddList }: FormProps) => {
  const [listTitle, setListTitle] = useState("");

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newList = {
      id: Math.floor(Math.random() * 10000),
      listName: listTitle,
      todos: [],
    };

    onAddList(newList);
  };

  return (
    <FormWrapper onSubmit={handleSubmit} topMargin="mt-3">
      <div className="flex flex-col gap-2">
        <label htmlFor="todoTitle" className="text-sm">
          To-Do list name
        </label>
        <input
          onChange={handleChangeTitle}
          value={listTitle}
          type="text"
          name="todoTitle"
          id="todoTitle"
          className="border focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-sky-400 focus:border-transparent rounded-md p-2 placeholder:text-gray-400 placeholder:font-light "
          placeholder="Enter the To-do List name"
          required
        />
      </div>
      <FormActions onClick={onShowForm} />
    </FormWrapper>
  );
};
export default ListForm;
