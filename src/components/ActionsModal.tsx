import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { changeCurrentTodoList } from "../store/todoSlice";

const actions = [
  { name: "Edit", icon: <PencilIcon className="w-3 h-3" /> },
  { name: "Delete", icon: <TrashIcon className="w-3 h-3" /> },
];

interface ActionsModalProps {
  onEditTask?: () => void;
  onDeleteTask?: () => void;
  listId?: number;
  className?: string;
}

const ActionsModal = ({
  onEditTask,
  onDeleteTask,
  listId,
  className,
}: ActionsModalProps) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${className}`}
            >
              <span onClick={() => dispatch(changeCurrentTodoList(listId!))}>
                <EllipsisVerticalIcon className="w-5 h-5" />
              </span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-5 top-4 z-10 mt-3 w-fit max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl ">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-5 bg-white p-4 lg:grid-cols-2">
                    {actions.map((item) => (
                      <button
                        key={item.name}
                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 text-gray-800"
                        onClick={() => {
                          if (item.name === "Edit" && onEditTask) {
                            onEditTask();
                          } else if (item.name === "Delete" && onDeleteTask) {
                            onDeleteTask();
                          }
                        }}
                      >
                        {item.icon}
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-700">
                            {item.name}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
export default ActionsModal;
