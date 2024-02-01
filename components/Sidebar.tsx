"use client";

import clsx from "clsx";
import { useEffect } from "react";
import { useSidebar } from ".";

type SidebarProps = React.PropsWithChildren & {
  title?: string;
};

export function Sidebar({ title, children }: SidebarProps) {
  const { toggle, isToggled } = useSidebar();

  useEffect(() => {
    const classList = document.body.classList;
    const className = "overflow-hidden";

    isToggled ? classList.add(className) : classList.remove(className);

    () => {
      classList.remove(className);
    };
  }, [isToggled]);

  return (
    <div
      className={clsx(
        "top-0 w-[312px] h-screen lg:relative lg:w-auto lg:h-auto z-10 bg-neutral-900 lg:bg-transparent -right-full lg:right-auto fixed lg:static transition-all lg:transition-none duration-600",
        "pb-12 pt-4 lg:pt-0 lg:pb-0",
        { "!right-0": isToggled }
      )}
    >
      <div className="flex items-center justify-between px-4">
        {title && (
          <h2 className="text-lg font-medium mb-0 lg:sr-only">{title}</h2>
        )}

        <button
          type="button"
          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 lg:hidden"
          onClick={() => toggle(false)}
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <div className="mt-4 lg:mt-0 border-t lg:border-t-0 pt-6 lg:pt-0">
        {children}
      </div>
    </div>
  );
}
