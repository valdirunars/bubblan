import { Navigate, useNavigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext";
import { AuthLayout } from "./AuthLayout";
import { AuthLink } from "./AuthLink";
import { Button } from "../Button";
import { Card } from "../Card";
import { SignInEmailPass } from "./SignInEmailPass";
import type { ReactNode } from "react";
import { useLocalization } from "../../localization";

type SignInType = "email" | "email-link" | "social";

type SignInOption = {
  type: SignInType;
  labelKey: string;
  path: string;
};

const supportedSignInTypes: SignInOption[] = [
  {
    type: "email",
    labelKey: "auth.emailAndPassword",
    path: "/auth/sign-in/email",
  },
];

export const SignIn = () => {
  const { session } = useSession();
  const navigate = useNavigate();
  const { translate } = useLocalization();

  if (session) return <Navigate to="/" />;

  if (supportedSignInTypes.length === 1) {
    const { type } = supportedSignInTypes[0];
    switch (type) {
      case "email":
        return <SignInEmailPass showBackLink={false} />;
      case "email-link":
        return <p>{translate("auth.notImplemented.emailLink")}</p>;
      case "social":
        return <p>{translate("auth.notImplemented.social")}</p>;
      default:
        return ((_some: never): ReactNode => {
          throw new Error(`Unsupported sign in type: ${type}`);
        })(type);
    }
  }

  return (
    <AuthLayout>
      <Card>
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight mb-6">
          {translate("auth.signIn")}
        </h1>
        <div className="flex flex-col gap-3">
          {supportedSignInTypes.map(({ type, labelKey, path }) => (
            <Button key={type} fullWidth onClick={() => navigate(path)}>
              {translate(labelKey)}
            </Button>
          ))}
        </div>
        <div className="mt-6 pt-5 border-t border-slate-200 text-center">
          <AuthLink to="/auth/sign-up">
            {translate("auth.dontHaveAccount")}
          </AuthLink>
        </div>
      </Card>
    </AuthLayout>
  );
};
