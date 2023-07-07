export type ModifyButtonProps = {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ModifyButton({ setIsEditing }: ModifyButtonProps) {
  return (
    <button
      className="bg-green-300 p-2 rounded-lg duration-150 hover:bg-green-400"
      onClick={() => setIsEditing((prev) => !prev)}
    >
      Modify
    </button>
  );
}
