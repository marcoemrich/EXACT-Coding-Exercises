type ButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
};

export function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  const baseClasses =
    "rounded-md px-4 py-2 font-semibold tracking-wide shadow-md transition-colors";
  const variantClasses =
    variant === "primary"
      ? "bg-amber-500 text-gray-900 hover:bg-amber-400"
      : "bg-gray-700 text-gray-100 hover:bg-gray-600";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      {label}
    </button>
  );
}
