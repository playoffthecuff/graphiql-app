import {CssBaseline} from '@mui/material';
import {RemixBrowser} from '@remix-run/react';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import Fetch from 'i18next-fetch-backend';
import React, {startTransition, StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';
import {initReactI18next, I18nextProvider} from 'react-i18next';
import {getInitialNamespaces} from 'remix-i18next/client';
import {defaultNS, fallbackLng, supportedLanguages} from '~/locales/config/i18n';
import {ClientStyleContext, createEmotionCache} from './';
import {CacheProvider} from '@emotion/react';
import i18next from 'i18next';

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({children}: ClientCacheProviderProps) {
  const [cache, setCache] = React.useState(createEmotionCache());

  const clientStyleContextValue = React.useMemo(
    () => ({
      reset() {
        setCache(createEmotionCache());
      },
    }),
    [],
  );

  return (
    <ClientStyleContext.Provider value={clientStyleContextValue}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

export async function i18nHydrate() {
  // eslint-disable-next-line import/no-named-as-default-member
  await i18next
    .use(initReactI18next)
    .use(Fetch)
    .use(I18nextBrowserLanguageDetector)
    .init({
      defaultNS,
      fallbackLng,
      supportedLngs: supportedLanguages,
      ns: getInitialNamespaces(),
      detection: {
        order: ['htmlTag'],
        lookupFromPathIndex: 0,
        caches: [],
      },
      backend: {
        loadPath: '/api/locales?lng={{lng}}&ns={{ns}}',
      },
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <ClientCacheProvider>
        <I18nextProvider i18n={i18next}>
          <CssBaseline />
          <StrictMode>
            <RemixBrowser />
          </StrictMode>
        </I18nextProvider>
      </ClientCacheProvider>,
    );
  });
}
