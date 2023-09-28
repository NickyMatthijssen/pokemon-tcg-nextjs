"use client";

import { useSidebar } from ".";

export function SidebarToggle() {
  const { toggle } = useSidebar();

  return (
    <button onClick={() => toggle()} type="button" className="block md:hidden">
      Filter
    </button>
  );
}
