"use client";

import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
    <div className="flex justify-center mt-8">
      <Link
        href={`${prefix}?page=${currentPage - 1}`}
        className={clsx("p-4", {
          "pointer-events-none": 1 === currentPage,
        })}
      >
        &lt;
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={`${prefix}?page=${page}&${newParams.toString()}`}
          className={clsx("p-4", {
            "pointer-events-none": page === currentPage,
          })}
        >
          {page}
        </Link>
      ))}

      <Link
        href={`${prefix}?page=${currentPage + 1}`}
        className={clsx("p-4", {
          "pointer-events-none": endPage === currentPage,
        })}
      >
        &gt;
      </Link>
    </div>
  );
}
