import { type ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  className?: string;
};

export const AuthLayout = ({ children, className = "" }: AuthLayoutProps) => (
  <main
    className={`min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 ${className}`.trim()}
  >
    {children}
  </main>
);
