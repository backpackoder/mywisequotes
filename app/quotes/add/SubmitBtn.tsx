"use client";

export type SubmitBtnProps = {
  addQuote: () => Promise<any>;
};

export function SubmitBtn({ addQuote }: SubmitBtnProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 bg-green-300 p-2 border-2 rounded-lg mx-auto duration-300 hover:bg-green-500 hover:text-white"
      onClick={() => addQuote()}
    >
      Submit
    </button>
  );
}
