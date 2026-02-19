import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { supabase } from "../supabase/supabase";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export const SignIn = () => {
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
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <form
        className="w-full max-w-[22rem] p-8 bg-white rounded-xl shadow-sm border border-slate-200"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight mb-6">
          Sign In
        </h1>
        <div className="flex flex-col gap-1.5 mb-4">
          <label htmlFor="signin-email" className="text-[0.8125rem] font-medium text-slate-600">
            Email
          </label>
          <input
            id="signin-email"
            name="email"
            onChange={handleInputChange}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full px-3.5 py-2.5 text-[0.9375rem] text-slate-900 bg-white border border-slate-200 rounded-lg placeholder:text-slate-400 hover:border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5 mb-4">
          <label htmlFor="signin-password" className="text-[0.8125rem] font-medium text-slate-600">
            Password
          </label>
          <input
            id="signin-password"
            name="password"
            onChange={handleInputChange}
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            className="w-full px-3.5 py-2.5 text-[0.9375rem] text-slate-900 bg-white border border-slate-200 rounded-lg placeholder:text-slate-400 hover:border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-2 py-2.5 px-4 text-[0.9375rem] font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 active:bg-slate-700 transition-colors"
        >
          Sign in
        </button>
        <div className="mt-6 pt-5 border-t border-slate-200 text-center">
          <Link
            className="text-sm text-blue-500 font-medium hover:text-blue-600 transition-colors"
            to="/auth/sign-up"
          >
            Don't have an account? Sign up
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
