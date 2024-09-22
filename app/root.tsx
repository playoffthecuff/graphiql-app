import {LoaderFunctionArgs, json} from '@vercel/remix';
import {Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useRouteLoaderData} from '@remix-run/react';
import i18nServer, {localeCookie} from './i18n.server';
import {useChangeLanguage} from 'remix-i18next/react';
import '@fontsource/roboto';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {AuthProvider} from './hooks/Authorization/AuthProvider';

export function links() {
  return [{rel: 'stylesheet', href: '/app/styles/global.css'}];
}

export const handle = {i18n: ['translation']};

export async function loader({request}: LoaderFunctionArgs) {
  const locale = await i18nServer.getLocale(request);
  return json({locale}, {headers: {'Set-Cookie': await localeCookie.serialize(locale)}});
}

export default function App() {
  const loaderData = useRouteLoaderData<typeof loader>('root');
  const {locale} = useLoaderData<typeof loader>();
  useChangeLanguage(locale);
  return (
    <html lang={loaderData?.locale ?? 'en'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body style={{overflowY: 'scroll'}}>
        <AuthProvider>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </AuthProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
