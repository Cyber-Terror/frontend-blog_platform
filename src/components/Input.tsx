import type { ChangeEventHandler } from "react";
import { useId } from "react";

export default function Input({
  type = "text",
  label,
  value,
  onChange,
  error,
}: {
  type?: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: string;
}) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="flex flex-col gap-1.5 text-sm font-medium text-mauve-100"
        htmlFor={id}
      >
        {label}
        <input
          autoComplete="off"
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className="rounded-md border-2 border-mauve-400 bg-mauve-800 px-3 py-2 text-mauve-100 placeholder:text-mauve-300 focus:outline-none focus:ring-2 focus:ring-mauve-300"
        />
      </label>
      {error && <p className="text-xs text-red-300">{error}</p>}
    </div>
  );
}
