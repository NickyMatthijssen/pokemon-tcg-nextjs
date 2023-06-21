import clsx from "clsx";

type Props = {
  width?: string;
  height?: string;
  className?: string;
};

export default function Skeleton({
  className = "",
  width = "200px",
  height = "16px",
}: Props) {
  return (
    <div
      className={clsx(className, "animate-pulse bg-neutral-400 rounded-md")}
      style={{ width, height }}
    />
  );
}
