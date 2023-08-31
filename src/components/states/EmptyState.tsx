const EmptyState = ({ message }: { message: string }) => {
  return (
    <p className="text-sm text-gray-500 italic mt-2 text-center">{message}</p>
  );
};
export default EmptyState;
