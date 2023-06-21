"use client";

import clsx from "clsx";
import React, { useMemo, useState } from "react";

type Props = React.PropsWithChildren & {
  label: string;
};

export default function ExpansionList({ label, children }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const shownChildren = useMemo(
    () =>
      isExpanded ? children : React.Children.toArray(children).slice(0, 5),
    [children, isExpanded]
  );

  const toggle = () => setIsExpanded((isExpanded) => !isExpanded);

  return (
    <div className="mb-4">
      <label className="text-lg font-bold text-neutral-400" onClick={toggle}>
        {label}
      </label>

      <div
        className={clsx("overflow-y-auto", {
          "h-28": React.Children.toArray(children).length >= 4,
        })}
      >
        {React.Children.toArray(children).map((child, index) => (
          <div
            key={index}
            className={clsx(index >= 4 && !isExpanded && "hidden")}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
