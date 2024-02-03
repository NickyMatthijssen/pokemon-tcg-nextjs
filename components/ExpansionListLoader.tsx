import { PlusIcon } from "@heroicons/react/24/outline";

type ExpansionListLoaderProps = {
  label: string;
};

export default function ExpansionListLoader({
  label,
}: ExpansionListLoaderProps) {
  return (
    <div className="py-6 px-4 lg:px-0 border-b">
      <h3 className="-my-3 flow-root">
        <div className="flex w-full items-center justify-between py-3 text-sm cursor-wait">
          <span className="font-medium">{label}</span>

          <PlusIcon className="h-5 w-5" />
        </div>
      </h3>
    </div>
  );
}
