import { type ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => (
  <div
    className={`w-full max-w-[30rem] p-8 bg-white rounded-xl shadow-sm border border-slate-200 ${className}`.trim()}
  >
    {children}
  </div>
);
