import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext";

/**
 * Handles the redirect from Supabase email verification.
 * Supabase redirects here with tokens in the URL hash (#access_token=...&refresh_token=...).
 * The Supabase client automatically exchanges these for a session.
 */
export const AuthCallback = () => {
  const { session } = useSession();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const params = new URLSearchParams(hash.replace("#", ""));
    const errorParam = params.get("error_description") ?? params.get("error");

    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }
  }, []);

  if (error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-sm border border-slate-200 text-center">
          <h1 className="text-lg font-semibold text-slate-900 mb-2">
            Verification failed
          </h1>
          <p className="text-sm text-slate-600 mb-6">{error}</p>
          <a
            href="/auth/sign-in"
            className="text-sm font-medium text-blue-500 hover:text-blue-600"
          >
            Back to sign in
          </a>
        </div>
      </main>
    );
  }

  if (session) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-br from-slate-50 to-slate-100">
      <div
        className="w-10 h-10 rounded-full border-2 border-slate-200 border-t-blue-500 animate-spin"
        aria-hidden
      />
      <span className="text-sm text-slate-500 tracking-wide">
        Confirming your email...
      </span>
    </main>
  );
};
