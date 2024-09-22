import {serverOnly$} from 'vite-env-only/macros';

import enTranslation from '../en';
import esTranslation from '../es';

export const supportedLanguages = ['es', 'en'];
export const fallbackLng = 'en';
export const defaultNS = 'translation';

export const resources = serverOnly$({
  en: {translation: enTranslation},
  es: {translation: esTranslation},
});
