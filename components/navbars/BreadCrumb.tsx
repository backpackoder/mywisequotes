import Link from "next/link";

type BreadCrumbProps = {
  items: {
    name: string;
    href: string;
    svg?: JSX.Element;
    current: boolean;
  }[];
};

export function BreadCrumb({ items }: BreadCrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-center">
      <ol className="flex items-center gap-1 text-sm text-gray-600">
        {items.map((item, index) => {
          return item.svg ? (
            <>
              <li key={index} className={`${item.current ? "text-blue-500" : ""}`}>
                <Link
                  href={item.href}
                  className={`block transition ${
                    item.current ? "hover:text-blue-700" : "hover:text-gray-700"
                  }`}
                >
                  <span className="sr-only">{item.name}</span>

                  {item.svg}
                </Link>
              </li>

              {index < items.length - 1 && (
                <li>
                  <SVG_Arrow />
                </li>
              )}
            </>
          ) : (
            <>
              <li key={index} className={`${item.current ? "text-blue-500" : ""}`}>
                <Link
                  href={item.href}
                  className={`block transition ${
                    item.current ? "hover:text-blue-700" : "hover:text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              </li>

              {index < items.length - 1 && (
                <li>
                  <SVG_Arrow />
                </li>
              )}
            </>
          );
        })}
      </ol>
    </nav>
  );
}

export function SVG_Arrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clip-rule="evenodd"
      />
    </svg>
  );
}

export function SVG_Home() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}
