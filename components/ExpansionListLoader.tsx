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

          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"></path>
          </svg>
        </div>
      </h3>
    </div>
  );
}
