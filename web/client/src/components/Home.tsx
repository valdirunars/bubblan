import { Navigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { supabase } from "../supabase/supabase";
import { useLocalization } from "../localization";

export const Home = () => {
  const { session } = useSession();
  const { translate } = useLocalization();

  if (!session) return <Navigate to="/auth/sign-in" replace />;

  const username =
    session.user?.email ??
    session.user?.user_metadata?.user_name ??
    translate("common.unknown");

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-sm border border-slate-200 text-center">
        <p className="text-slate-600 mb-2">
          {translate("auth.loggedInAs")}{" "}
          <span className="font-medium text-slate-900">{username}</span>
        </p>
        <button
          type="button"
          onClick={handleSignOut}
          className="mt-4 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          {translate("auth.signOut")}
        </button>
      </div>
    </main>
  );
};
