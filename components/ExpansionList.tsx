"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useState } from "react";

type Props = React.PropsWithChildren & {
  label: string;
};

export default function ExpansionList({ label, children }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggle = () => setIsExpanded((isExpanded) => !isExpanded);

  return (
    <div className="py-6 px-4 lg:px-0 border-b">
      <h3 className="-my-3 flow-root">
        <button
          onClick={toggle}
          type="button"
          className="flex w-full items-center justify-between py-3 text-sm"
        >
          <span className="font-medium">{label}</span>

          <span className="ml-6 flex items-center">
            {isExpanded ? (
              <MinusIcon className="h-5 w-5" />
            ) : (
              <PlusIcon className="h-5 w-5" />
            )}
          </span>
        </button>
      </h3>

      <div className={clsx("pt-6", { hidden: !isExpanded })}>
        <div className="-m-1 p-1 pl-2 mr-0 space-y-4 max-h-[200px] overflow-y-scroll overflow-x-visible">
          {children}
        </div>
      </div>
    </div>
  );
}
