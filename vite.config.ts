import {vitePlugin as remix} from '@remix-run/dev';
import {installGlobals} from '@remix-run/node';
import {defineConfig} from 'vite';
import {envOnlyMacros} from 'vite-env-only';
import tsconfigPaths from 'vite-tsconfig-paths';
import {vercelPreset} from '@vercel/remix/vite';

installGlobals();

export default defineConfig({
  plugins: [
    envOnlyMacros(),
    remix({
      presets: [vercelPreset()],
    }),
    tsconfigPaths(),
  ],
  server: {port: 3000},
  ssr: {
    noExternal: ['@uiw/react-codemirror', 'cm6-graphql'],
  },
});
