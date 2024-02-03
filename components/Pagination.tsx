"use client";

import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type Props = {
  currentPage: number;
  totalResources: number;
  pageSize: number;
  prefix: string;
};

function getPages(
  currentPage: number,
  totalPages: number
): Array<string | number> {
  const pages: Array<string | number> = [];

  const limiter = 5;

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  let leftPages =
    totalPages <= limiter + 1
      ? totalPages
      : Math.min(currentPage < limiter ? limiter : 1, totalPages);

  for (let i = 1; i <= leftPages; i++) {
    pages.push(i);
  }

  if (totalPages <= pages.length) {
    return pages;
  }

  pages.push("...");

  // Middle pages
  if (currentPage >= limiter && currentPage <= totalPages - limiter + 1) {
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    pages.push("...");
  }

  let rightPages =
    totalPages - (totalPages - limiter + 1 < currentPage ? limiter - 1 : 0);

  for (let i = rightPages; i <= totalPages; i++) {
    if (pages.includes(i)) {
      const dots = pages.indexOf("...");

      if (!!~dots) {
        pages.splice(dots, 1);
      }

      continue;
    }

    pages.push(i);
  }

  return pages;
}

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
  const endPage = Math.min(totalPages, currentPage + 2);

  const pages = getPages(currentPage, totalPages);

  return (
    <div className="flex items-center justify-between border-t border-neutral-700 mt-4 py-3">
      <div className="flex flex-1 justify-between md:hidden">
        <PaginationLink
          href={`${prefix}${currentPage - 1}`}
          disabled={currentPage <= 1}
        >
          Previous
        </PaginationLink>
        <PaginationLink
          href={`${prefix}${currentPage + 1}`}
          disabled={currentPage >= totalPages}
        >
          Next
        </PaginationLink>
      </div>

      <div className="hidden md:flex sm:flex-1 sm:items-center sm:justify-between">
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
              aria-label="Previous"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </PaginationLink>

            {pages.map((page, index) => (
              <PaginationLink
                key={index}
                href={`${prefix}${page}?${newParams.toString()}`}
                active={page === currentPage}
                disabled={page === currentPage || !Number.isInteger(page)}
              >
                {page}
              </PaginationLink>
            ))}

            <PaginationLink
              href={`${prefix}${currentPage + 1}?${newParams.toString()}`}
              disabled={currentPage === endPage}
              right
              aria-label="Next"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </PaginationLink>
          </nav>
        </div>
      </div>
    </div>
  );
}

type PaginationLinkProps = Omit<
  React.ComponentProps<typeof Link>,
  "className"
> & {
  active?: boolean;
  disabled?: boolean;
  left?: boolean;
  right?: boolean;
  colorClass?: string;
};

function PaginationLink({
  children,
  left,
  right,
  active,
  disabled,
  colorClass,
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      className={clsx(
        "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-neutral-800 hover:bg-indigo-800 focus:z-20 focus:outline-offset-0",
        colorClass,
        {
          "pointer-events-none": active || disabled,
          "rounded-l-md !px-2": left,
          "rounded-r-md !px-2": right,
          "z-10 bg-indigo-800 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800":
            active,
        }
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
