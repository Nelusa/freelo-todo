import { useState } from "react";
import { Todo } from "../../helpers/types";
import FormWrapper from "./FormWrapper";
import FormActions from "./FormActions";
import { format } from "date-fns";
import Select from "../ui/Select";

interface FormProps {
  onShowForm: () => void;
  onAddTask?: (newTodo: Todo) => void;
}

const date = new Date();
const showTime =
  date.getHours() +
  ":" +
  (date.getMinutes() <= 9 ? "0" : "") +
  date.getMinutes() +
  ":" +
  (date.getSeconds() <= 9 ? "0" : "") +
  date.getSeconds();

const dateNow = format(new Date(), "yyyy-MM-dd");

const TodoForm = ({ onShowForm, onAddTask }: FormProps) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low");

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask = {
      id: Math.floor(Math.random() * 10000),
      title: taskTitle,
      description: taskDescription,
      assignee: "Nela Letochová",
      date: dateNow,
      time: showTime,
      status: "in-progress",
      priority: taskPriority.toLowerCase(),
    };

    onAddTask!(newTask);
    onShowForm();
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
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
      <div className="flex flex-col gap-2">
        <Select selected={taskPriority} setSelected={setTaskPriority} />
      </div>

      <FormActions onClick={onShowForm} />
    </FormWrapper>
  );
};
export default TodoForm;
