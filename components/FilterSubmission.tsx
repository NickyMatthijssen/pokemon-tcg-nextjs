"use client";

import { useEffect } from "react";
// @ts-ignore
import { useFormStatus } from "react-dom";
import { useSidebar } from "~/components/SidebarProvider";

export function FilterSubmission() {
  const { pending } = useFormStatus();
  const { toggle } = useSidebar();

  useEffect(() => {
    if (!pending) return;

    toggle(false);
  }, [pending, toggle]);

  return <button className="button button--full">Search</button>;
}
