import { Language, TranslationDictionary } from './types';
import { en } from './en';
import { hi } from './hi';
import { mr } from './mr';

export * from './types';

export const translations: Record<Language, TranslationDictionary> = {
  en,
  hi,
  mr
};

export const defaultLanguage: Language = 'hi';

export function getTranslations(lang: Language): TranslationDictionary {
  return translations[lang] || translations.en;
}
