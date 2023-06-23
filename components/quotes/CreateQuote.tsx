import { FaPlus } from "react-icons/fa";

export function CreateQuote() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 border-2 rounded-lg">
      <h3>Create a new quote</h3>
      <FaPlus size={75} className="p-4 border-2 rounded-full cursor-pointer" />
    </div>
  );
}
