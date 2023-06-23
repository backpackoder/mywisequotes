"use client";

export type HamburgerMenuProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HamburgerMenu({ setIsOpen }: HamburgerMenuProps) {
  function hamburgerMenuLinesStyle({ top }: { top: string }) {
    return `absolute left-1/2 top-${top} -translate-x-1/2 w-9/12 border-2 border-black rounded-lg`;
  }

  return (
    <div
      className="absolute top-0 right-[1px] translate-x-full w-[75px] h-[75px] bg-white rounded-se-xl rounded-ee-xl shadow-xl
        sm:hidden"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="relative w-full h-full border-2 border-red-500">
        <div className={hamburgerMenuLinesStyle({ top: "1/4" })}></div>
        <div className={hamburgerMenuLinesStyle({ top: "1/2" })}></div>
        <div className={hamburgerMenuLinesStyle({ top: "3/4" })}></div>
      </div>
    </div>
  );
}
