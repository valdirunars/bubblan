type AuthInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
};

const inputClasses =
  "w-full px-3.5 py-2.5 text-[0.9375rem] text-slate-900 bg-white border border-slate-200 rounded-lg placeholder:text-slate-400 hover:border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors";

const labelClasses = "text-[0.8125rem] font-medium text-slate-600";

export const AuthInput = ({
  id,
  label,
  className,
  ...props
}: AuthInputProps) => (
  <div className="flex flex-col gap-1.5 mb-4">
    <label htmlFor={id} className={labelClasses}>
      {label}
    </label>
    <input
      id={id}
      className={`${inputClasses} ${className ?? ""}`.trim()}
      {...props}
    />
  </div>
);
