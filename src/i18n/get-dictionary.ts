import type { Locale } from "./config";
import en from "../../locales/en.json";
import fa from "../../locales/fa.json";

const dictionaries = { en, fa } as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
