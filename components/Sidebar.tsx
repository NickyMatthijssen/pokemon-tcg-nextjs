"use client";

import clsx from "clsx";
import { useEffect } from "react";
import { SidebarCloser, useSidebar } from ".";

export function Sidebar({ children }: React.PropsWithChildren) {
  const { isToggled } = useSidebar();

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
        "top-0 hidden md:block fixed w-screen h-screen md:relative md:w-auto md:h-auto z-10 bg-neutral-900 md:bg-transparent",
        "py-16 md:py-0",
        { "!block": isToggled }
      )}
    >
      <SidebarCloser />
      {children}
    </div>
  );
}
