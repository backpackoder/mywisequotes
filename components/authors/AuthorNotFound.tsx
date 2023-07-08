import Link from "next/link";

// Commons
import { ROUTES } from "@/commons/commons";

type AuthorNotFoundProps = {
  authorName: string;
};

export function AuthorNotFound({ authorName }: AuthorNotFoundProps) {
  return (
    <>
      <h1 className="text-2xl font-bold">Author not found</h1>
      <p>Author {`"${authorName}"`} has not been added yet!</p>
      <Link
        href={{
          pathname: ROUTES.AUTHOR_ADD,
          query: { author: authorName },
        }}
        className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
      >
        Add this author
      </Link>
    </>
  );
}
