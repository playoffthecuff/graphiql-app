import {CacheProvider} from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import {CssBaseline} from '@mui/material';
import {EntryContext, AppLoadContext, createReadableStreamFromReadable} from '@remix-run/node';
import {RemixServer} from '@remix-run/react';
import ReactDOMServer, {renderToPipeableStream} from 'react-dom/server';
import {I18nextProvider} from 'react-i18next';
import {ABORT_DELAY} from './entry.server';
import {createEmotionCache} from './utils';
import {i18n as I18next} from 'i18next';
import {PassThrough} from 'node:stream';

export default async function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  _loadContext: AppLoadContext,
  i18next: I18next,
) {
  let shellRendered = false;
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

  return new Promise((resolve, reject) => {
    const {abort} = renderToPipeableStream(
      <I18nextProvider i18n={i18next}>
        <CacheProvider value={cache}>
          <CssBaseline />
          <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />
        </CacheProvider>
      </I18nextProvider>,
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          responseHeaders.set('Content-Type', 'text/html');

          const markup = `<!DOCTYPE html>${html.replace(
            /<meta(\s)*name="emotion-insertion-point"(\s)*content="emotion-insertion-point"(\s)*\/>/,
            `<meta name="emotion-insertion-point" content="emotion-insertion-point"/>${stylesHTML}`,
          )}`;

          body.write(markup);

          resolve(
            new Response(createReadableStreamFromReadable(body), {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );
          body.end();
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
