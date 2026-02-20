import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext";
import { supabase } from "../../supabase/supabase";
import { AuthLayout } from "./AuthLayout";
import { Card } from "../Card";
import { AuthInput } from "./AuthInput";
import { Button } from "../Button";
import { AuthLink } from "./AuthLink";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

type SignInEmailPassProps = {
  showBackLink?: boolean;
};

export const SignInEmailPass = ({ showBackLink = true }: SignInEmailPassProps) => {
  const { session } = useSession();
  if (session) return <Navigate to="/" />;

  const [status, setStatus] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Logging in...");

    try {
      const res = await fetch(`${API_URL}/api/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.error ?? "Sign in failed");
        return;
      }

      if (data.access_token && data.refresh_token) {
        await supabase.auth.setSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });
      }
      setStatus("");
    } catch {
      setStatus("Sign in failed");
    }
  };

  const isError = status && status !== "Logging in...";

  return (
    <AuthLayout className="relative">
      {showBackLink && (
        <Link
          className="absolute top-6 left-6 text-slate-500 text-sm font-medium hover:text-slate-900 transition-colors"
          to="/auth/sign-in"
        >
          ← Back
        </Link>
      )}
      <form onSubmit={handleSubmit} className="w-full max-w-[22rem]">
        <Card>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight mb-6">
            Sign In
          </h1>
          <AuthInput
            id="signin-email"
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
          <AuthInput
            id="signin-password"
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          <Button type="submit" fullWidth className="mt-2">Sign in</Button>
          <div className="mt-6 pt-5 border-t border-slate-200 text-center">
            <AuthLink to="/auth/sign-up">
              Don't have an account? Sign up
            </AuthLink>
          </div>
          {status && (
            <p
              className={`mt-4 text-sm text-center ${
                isError ? "text-red-600" : "text-slate-500"
              }`}
            >
              {status}
            </p>
          )}
        </Card>
      </form>
    </AuthLayout>
  );
};
