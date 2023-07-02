import Link from "next/link";
import { FaPlus } from "react-icons/fa";

// Commons
import { ROUTES } from "@/commons/commons";

export function CreateQuote() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 border-2 rounded-lg">
      <h3>Create a new quote</h3>
      <Link href={ROUTES.QUOTE_CREATE}>
        <FaPlus size={75} className="p-4 border-2 rounded-full cursor-pointer" />
      </Link>
    </div>
  );
}
