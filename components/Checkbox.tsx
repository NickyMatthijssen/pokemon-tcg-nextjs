export default function Checkbox({
  value,
  label,
  ...props
}: {
  value: string;
  label: string;
} & React.HTMLProps<HTMLInputElement>) {
  return (
    <div className="flex items-center">
      <input
        {...props}
        type="checkbox"
        value={value}
        id={value}
        className="h-4 w-4 bg-transparent rounded border-gray-300 text-violet-800 focus:ring-violet-500"
      />

      <label htmlFor={value} className="ml-3 text-sm">
        {label}
      </label>
    </div>
  );
}
