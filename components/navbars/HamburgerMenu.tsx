"use client";

export type HamburgerMenuProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function HamburgerMenu({ setIsOpen }: HamburgerMenuProps) {
  function hamburgerMenuLinesStyle({ top }: { top: string }) {
    return `absolute left-1/2 ${top} -translate-x-1/2 w-9/12 border-2 border-black rounded-lg`;
  }

  return (
    <div
      className="absolute top-0 right-[1px] translate-x-full w-[75px] h-[75px] bg-[rgb(240,240,240)]
      rounded-se-xl rounded-ee-xl shadow-inner cursor-pointer
        sm:hidden"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="relative w-full h-full rounded-se-xl rounded-ee-xl">
        <div className={hamburgerMenuLinesStyle({ top: "top-1/4" })}></div>
        <div className={hamburgerMenuLinesStyle({ top: "top-1/2" })}></div>
        <div className={hamburgerMenuLinesStyle({ top: "top-3/4" })}></div>
      </div>
    </div>
  );
}
