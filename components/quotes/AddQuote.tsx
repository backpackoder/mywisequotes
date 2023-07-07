import Link from "next/link";
import { FaPlus } from "react-icons/fa";

// Commons
import { ROUTES } from "@/commons/commons";

export function AddQuote() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 border-2 rounded-lg">
      <h3>Add a new quote</h3>

      <Link href={ROUTES.QUOTE_ADD}>
        <FaPlus
          size={75}
          className="p-4 border-2 rounded-full cursor-pointer duration-300 hover:scale-110"
        />
      </Link>
    </div>
  );
}
