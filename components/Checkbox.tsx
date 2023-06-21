export default function Checkbox({
  value,
  label,
  ...props
}: {
  value: string;
  label: string;
} & React.HTMLProps<HTMLInputElement>) {
  return (
    <div>
      <input {...props} type="checkbox" value={value} id={value} />

      <label htmlFor={value} className="ml-2">
        {label}
      </label>
    </div>
  );
}
