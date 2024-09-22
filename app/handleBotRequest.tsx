import {CacheProvider} from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import {CssBaseline} from '@mui/material';
import {EntryContext, AppLoadContext} from '@remix-run/node';
import {RemixServer} from '@remix-run/react';
import ReactDOMServer from 'react-dom/server';
import {I18nextProvider} from 'react-i18next';
import {createEmotionCache} from './utils';
import {i18n as I18next} from 'i18next';
import {ABORT_DELAY} from './entry.server';

export default async function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  _loadContext: AppLoadContext,
  i18next: I18next,
) {
  return new Promise(resolve => {
    const cache = createEmotionCache();
    const {extractCriticalToChunks} = createEmotionServer(cache);

    const MuiRemixServer = () => (
      <I18nextProvider i18n={i18next}>
        <CacheProvider value={cache}>
          <CssBaseline />
          <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />
        </CacheProvider>
      </I18nextProvider>
    );

    const html = ReactDOMServer.renderToString(<MuiRemixServer />);
    const {styles} = extractCriticalToChunks(html);
    let stylesHTML = '';

    styles.forEach(({key, ids, css}) => {
      const emotionKey = `${key} ${ids.join(' ')}`;
      const newStyleTag = `<style data-emotion="${emotionKey}">${css}</style>`;
      stylesHTML += newStyleTag;
    });

    const markup = `<!DOCTYPE html>${html.replace(
      /<meta(\s)*name="emotion-insertion-point"(\s)*content="emotion-insertion-point"(\s)*\/>/,
      `<meta name="emotion-insertion-point" content="emotion-insertion-point"/>${stylesHTML}`,
    )}`;

    responseHeaders.set('Content-Type', 'text/html');

    resolve(
      new Response(markup, {
        headers: responseHeaders,
        status: responseStatusCode,
      }),
    );
  });
}
