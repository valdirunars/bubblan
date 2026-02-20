import {
  createLocalizationContext,
  translations,
  type DottedLanguageObjectStringPaths,
  type Localization,
} from "@bubblan/localization";
import { localStorageAdapter } from "./storage";

type LocaleStructure = (typeof translations)["is"];

const { Provider: LocalizationProvider, useLocalization } =
  createLocalizationContext<LocaleStructure>();

export { LocalizationProvider, useLocalization };
export type { DottedLanguageObjectStringPaths, Localization };

/**
 * Props for the web LocalizationProvider with localStorage.
 * Use: <LocalizationProvider {...webLocalizationProviderProps}>
 */
export const webLocalizationProviderProps = {
  storage: localStorageAdapter,
  translations,
  defaultLocale: "is" as const,
  storageKey: "bubblan:locale",
};
