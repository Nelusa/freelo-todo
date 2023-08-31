import { useState } from "react";
import { Todo } from "../../helpers/types";
import FormWrapper from "./FormWrapper";
import FormActions from "./FormActions";

interface FormProps {
  onShowForm: () => void;
  onEditTask: (newTodo: Todo) => void;
  editedTodo: Todo;
}

const EditForm = ({ onShowForm, onEditTask, editedTodo }: FormProps) => {
  const [taskTitle, setTaskTitle] = useState(editedTodo?.title || "");
  const [taskDescription, setTaskDescription] = useState("");

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedTask = {
      ...editedTodo,
      title: taskTitle,
      description: taskDescription,
    };

    onEditTask(updatedTask);
    onShowForm();
  };

  return (
    <FormWrapper onSubmit={handleSubmit} topMargin="mt-2">
      Edit
      <div className="flex flex-col gap-2">
        <label htmlFor="taskTitle" className="sr-only">
          Title
        </label>
        <input
          onChange={handleChangeTitle}
          value={taskTitle}
          type="text"
          name="taskTitle"
          id="taskTitle"
          className="border focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-sky-400 focus:border-transparent rounded-md p-2 placeholder:text-gray-400 placeholder:font-light "
          placeholder="Enter task name..."
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="taskDescription" className="sr-only">
          Description
        </label>
        <input
          onChange={handleChangeDescription}
          value={taskDescription}
          type="text"
          name="taskDescription"
          id="taskDescription"
          className="border focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-sky-400 focus:border-transparent rounded-md p-2 placeholder:text-gray-400 placeholder:font-light "
        />
      </div>
      <FormActions onClick={onShowForm} />
    </FormWrapper>
  );
};
export default EditForm;
