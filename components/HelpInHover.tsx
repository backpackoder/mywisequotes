export function HelpInHover({ text }: { text: string }) {
  return (
    <div
      className="absolute -top-[5px] left-1/2 -translate-y-full -translate-x-1/2 opacity-0 bg-gray-100
    text-xs py-1 px-2 rounded-md duration-300 delay-300 group-hover:opacity-100"
    >
      {text}
    </div>
  );
}
