import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "../Button";
import { useSession } from "../../context/SessionContext";
import { supabase } from "../../supabase/supabase";
import { useLocalization } from "../../localization";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";
const APP_URL = import.meta.env.VITE_APP_URL ?? window.location.origin;

export const SignUp = () => {
  const { session } = useSession();
  const { translate } = useLocalization();

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
    setStatus(translate("auth.signingUp"));

    try {
      const redirectTo = `${APP_URL}/auth/callback`;
      const res = await fetch(`${API_URL}/api/auth/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formValues, redirectTo }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.error ?? translate("auth.signUpFailed"));
        return;
      }

      if (data.session?.access_token && data.session?.refresh_token) {
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });
        setStatus("");
      } else {
        setStatus(translate("auth.checkEmail"));
      }
    } catch {
      setStatus(translate("auth.signUpFailed"));
    }
  };

  const isError = status && status !== translate("auth.signingUp");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 relative">
      <Link
        className="absolute top-6 left-6 text-slate-500 text-sm font-medium hover:text-slate-900 transition-colors"
        to="/"
      >
        ← {translate("common.home")}
      </Link>
      <form
        className="w-full max-w-[22rem] p-8 bg-white rounded-xl shadow-sm border border-slate-200"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight mb-6">
          {translate("auth.signUp")}
        </h1>
        <div className="flex flex-col gap-1.5 mb-4">
          <label
            htmlFor="signup-email"
            className="text-[0.8125rem] font-medium text-slate-600"
          >
            {translate("common.email")}
          </label>
          <input
            id="signup-email"
            name="email"
            onChange={handleInputChange}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full px-3.5 py-2.5 text-[0.9375rem] text-slate-900 bg-white border border-slate-200 rounded-lg placeholder:text-slate-400 hover:border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5 mb-4">
          <label
            htmlFor="signup-password"
            className="text-[0.8125rem] font-medium text-slate-600"
          >
            {translate("common.password")}
          </label>
          <input
            id="signup-password"
            name="password"
            onChange={handleInputChange}
            type="password"
            placeholder="Min. 6 characters"
            autoComplete="new-password"
            className="w-full px-3.5 py-2.5 text-[0.9375rem] text-slate-900 bg-white border border-slate-200 rounded-lg placeholder:text-slate-400 hover:border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
          />
        </div>
        <Button type="submit" fullWidth className="mt-2">
          {translate("auth.createAccount")}
        </Button>
        <div className="mt-6 pt-5 border-t border-slate-200 text-center">
          <Link
            className="text-sm text-blue-500 font-medium hover:text-blue-600 transition-colors"
            to="/auth/sign-in"
          >
            {translate("auth.alreadyHaveAccount")}
          </Link>
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
      </form>
    </main>
  );
};
