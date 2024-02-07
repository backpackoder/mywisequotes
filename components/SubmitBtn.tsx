"use client";

export type SubmitBtnProps = {
  handleData: () => Promise<any>;
};

export function SubmitBtn({ handleData }: SubmitBtnProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 bg-green-300 p-2 border-2 rounded-lg mx-auto duration-300 hover:bg-green-500 hover:text-white"
      onClick={() => handleData()}
    >
      Submit
    </button>
  );
}
