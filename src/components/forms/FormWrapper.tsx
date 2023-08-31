import classNames from "../../helpers/classNames";

interface FormWrapperProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  topMargin?: string;
}

const FormWrapper = ({
  onSubmit,
  children,
  topMargin = "mt-10",
}: FormWrapperProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={classNames(
        "flex flex-col gap-4 bg-sky-100 rounded-md border border-sky-200 shadow-md p-2 md:p-4",
        topMargin
      )}
    >
      {children}
    </form>
  );
};
export default FormWrapper;
