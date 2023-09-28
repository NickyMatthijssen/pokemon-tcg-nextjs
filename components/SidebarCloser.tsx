"use client";

import { useSidebar } from ".";

export function SidebarCloser() {
  const { toggle } = useSidebar();

  return (
    <button
      onClick={() => toggle(false)}
      type="button"
      className="block md:hidden"
    >
      Close
    </button>
  );
}
