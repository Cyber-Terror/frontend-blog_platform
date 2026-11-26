export default function Spinner({
  label = "Loading...",
}: {
  label?: string;
}) {
  return (
    <div
      className="flex items-center gap-3 text-sm text-mauve-300"
      role="status"
      aria-live="polite"
    >
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-mauve-400 border-t-mauve-50" />
      <span>{label}</span>
    </div>
  );
}
