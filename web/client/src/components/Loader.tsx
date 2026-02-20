import { useLocalization } from "../localization";

export const Loader = () => {
  const { translate } = useLocalization();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 bg-slate-50">
      <div
        className="w-10 h-10 rounded-full border-2 border-slate-200 border-t-blue-500 animate-spin"
        aria-hidden
      />
      <span className="text-sm text-slate-500 tracking-wide">{translate("common.loading")}</span>
    </div>
  );
};
