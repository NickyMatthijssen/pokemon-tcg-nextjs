"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PaginationLink } from "./PaginationLink";

type Props = {
  currentPage: number;
  totalResources: number;
  pageSize: number;
  prefix: string;
};

export default function Pagination({
  currentPage,
  totalResources,
  pageSize,
  prefix = "/",
}: Props) {
  const params = useSearchParams()!;
  const newParams = new URLSearchParams(params.toString());
  newParams.delete("page");

  const totalPages = Math.ceil(totalResources / pageSize);

  const startPage = Math.max(1, currentPage - 3);
  const endPage = Math.min(totalPages, currentPage + 3);

  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between border-t border-neutral-700 mt-4 py-3">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          href={`${prefix}${currentPage - 1}`}
          className="relative inline-flex items-center rounded-md border border-neutral-800 bg-indigo-800 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Previous
        </Link>
        <Link
          href={`${prefix}${currentPage + 1}`}
          className="relative ml-3 inline-flex items-center rounded-md border border-neutral-800 bg-indigo-800 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          {totalResources > 0 ? (
            <p className="text-sm text-white">
              Showing
              <span className="font-medium px-1">
                {(currentPage - 1) * pageSize + 1}
              </span>
              to
              <span className="font-medium px-1">{currentPage * pageSize}</span>
              of
              <span className="font-medium px-1">{totalResources}</span>
              results
            </p>
          ) : (
            <p className="text-sm text-white">
              <span className="font-medium px-1">0</span>
              results
            </p>
          )}
        </div>

        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <PaginationLink
              href={`${prefix}${currentPage - 1}?${newParams.toString()}`}
              disabled={currentPage === 1}
              left
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </PaginationLink>

            {pages.map((page) => (
              <PaginationLink
                key={page}
                href={`${prefix}${page}?${newParams.toString()}`}
                active={page === currentPage}
              >
                {page}
              </PaginationLink>
            ))}

            <PaginationLink
              href={`${prefix}${currentPage + 1}?${newParams.toString()}`}
              disabled={currentPage === endPage}
              right
            >
              <span className="sr-only">Next</span>

              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </PaginationLink>
          </nav>
        </div>
      </div>
    </div>
  );
}
