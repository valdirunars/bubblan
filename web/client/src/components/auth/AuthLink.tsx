import { Link } from "react-router-dom";

type AuthLinkProps = {
  to: string;
  children: React.ReactNode;
};

const linkClasses =
  "text-sm text-blue-500 font-medium hover:text-blue-600 transition-colors";

export const AuthLink = ({ to, children }: AuthLinkProps) => (
  <Link className={linkClasses} to={to}>
    {children}
  </Link>
);
