/** Storage adapter interface – use localStorage for web, AsyncStorage for React Native. */
export interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
}

export type TranslationOptions = {
  fallback?: string;
  locale?: string;
  values?: object;
};

/**
 * Dotted key paths for translations. Use `string` in the shared package.
 * Apps can define their own typed version, e.g. from typeof translations.is.
 */
export type DottedLanguageObjectStringPaths<_T = unknown> = string;

export interface Localization<TKey extends string = string> {
  locale: string;
  setLocale: (locale: string) => void;
  translate: (dottedString: TKey, options?: TranslationOptions) => string;
}
