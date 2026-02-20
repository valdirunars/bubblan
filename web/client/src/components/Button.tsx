type ButtonVariant = "primary" | "secondary" | "cancel" | "destructive";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const baseClasses =
  "py-2.5 px-4 text-[0.9375rem] font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-700 focus:ring-slate-500",
  secondary:
    "text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border border-slate-200 focus:ring-slate-400",
  cancel:
    "text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 focus:ring-slate-400",
  destructive:
    "text-white bg-red-600 hover:bg-red-700 active:bg-red-800 focus:ring-red-500",
};

export const Button = ({
  variant = "primary",
  fullWidth,
  type = "button",
  className,
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={`${baseClasses} ${variantClasses[variant]} ${
      fullWidth ? "w-full" : ""
    } ${className ?? ""}`.trim()}
    {...props}
  />
);
