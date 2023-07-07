"use client";

import { FaPlus } from "react-icons/fa";

export type AddBtnProps = {
  text: string;
  addFunction: () => void;
};

export function AddBtn({ text, addFunction }: AddBtnProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 bg-green-300 p-2 border-2 rounded-lg duration-300 hover:bg-green-500 hover:text-white"
      onClick={() => addFunction()}
    >
      {text} <FaPlus className="rounded-full" />
    </button>
  );
}
