interface FormActionsProps {
  onClick: () => void;
}

const FormActions = ({ onClick }: FormActionsProps) => {
  return (
    <div className="flex gap-2">
      <button
        className="bg-green-500 border border-green-600 text-white px-6 py-1.5 rounded-md text-sm font-semibold"
        type="submit"
      >
        Save
      </button>
      <button
        className="bg-white border border-gray-300 px-3 py-1.5 rounded-md text-sm"
        type="button"
        onClick={onClick}
      >
        Cancel
      </button>
    </div>
  );
};
export default FormActions;
