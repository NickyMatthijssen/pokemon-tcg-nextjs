"use client";

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
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden={isExpanded}
              >
                <path
                  fillRule="evenodd"
                  d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden={isExpanded}
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"></path>
              </svg>
            )}
          </span>
        </button>
      </h3>

      {isExpanded && (
        <div className="pt-6">
          <div className="-m-1 p-1 mr-0 space-y-4 max-h-[200px] overflow-y-scroll overflow-x-visible">
            {React.Children.toArray(children).map((child, index) => (
              <React.Fragment key={index}>{child}</React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
