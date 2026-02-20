type AuthButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const buttonClasses =
  "w-full mt-2 py-2.5 px-4 text-[0.9375rem] font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 active:bg-slate-700 transition-colors";

export const AuthButton = ({ className, ...props }: AuthButtonProps) => (
  <button
    type="submit"
    className={`${buttonClasses} ${className ?? ""}`.trim()}
    {...props}
  />
);
