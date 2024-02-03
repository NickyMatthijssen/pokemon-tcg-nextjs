"use client";

import { FunnelIcon } from "@heroicons/react/24/outline";
import { useSidebar } from "./SidebarProvider";

export default function SidebarToggle() {
  const { toggle } = useSidebar();

  return (
    <button
      type="button"
      className="-m-2 ml-4 p-2 sm:ml-6 lg:hidden"
      onClick={() => toggle()}
      aria-label="Filters"
    >
      <FunnelIcon className="h-6 w-6" />
    </button>
  );
}
