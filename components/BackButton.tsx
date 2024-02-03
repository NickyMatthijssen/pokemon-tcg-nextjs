"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button onClick={router.back}>
      <ChevronLeftIcon className="w-6 h-6" />
    </button>
  );
}
