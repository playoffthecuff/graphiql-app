import type {AppLoadContext, EntryContext} from '@vercel/remix';
import {isbot} from 'isbot';
import {createInstance} from 'i18next';
import i18nServer from './i18n.server';
import {initReactI18next} from 'react-i18next';
import * as i18n from './locales/config/i18n';
import handleBotRequest from './handleBotRequest';
import handleBrowserRequest from './handleBrowserRequest';

export const ABORT_DELAY = 5_000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext,
) {
  const instance = createInstance();
  const lng = await i18nServer.getLocale(request);
  const ns = i18nServer.getRouteNamespaces(remixContext);

  await instance.use(initReactI18next).init({...i18n, lng, ns});

  return isbot(request.headers.get('user-agent') || '')
    ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext, instance)
    : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext, instance);
}
