import { en } from "./locales/en";
import { is } from "./locales/is";

export const translations: Record<string, typeof is> = {
  is,
  en,
};

export type Locale = keyof typeof translations;

export const emojis: Record<Locale, string> = {
  is: "🇮🇸",
  en: "🇺🇸",
};

export const locales = Object.keys(translations);

/** Dotted translation keys derived from the Icelandic locale structure. */
type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];
type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
    ? F
    : T extends [infer F, ...infer R]
      ? F extends string
        ? `${F}${D}${Join<Extract<R, string[]>, D>}`
        : never
      : string;
export type DottedLanguageObjectStringPaths = Join<
  PathsToStringProps<typeof is>,
  "."
>;
