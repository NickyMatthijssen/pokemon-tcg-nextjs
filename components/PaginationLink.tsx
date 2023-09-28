import clsx from "clsx";
import Link from "next/link";

type Props = React.ComponentProps<typeof Link> & {
  active?: boolean;
  disabled?: boolean;
  left?: boolean;
  right?: boolean;
};

export function PaginationLink({
  children,
  left,
  right,
  active,
  disabled,
  ...props
}: Props) {
  return (
    <Link
      className={clsx(
        "relative hidden items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-neutral-800 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex",
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
