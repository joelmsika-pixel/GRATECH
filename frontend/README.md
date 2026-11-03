# frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Production deployment

This is a static Vue 3 single-page application. Build it with `npm ci` and
`npm run build`, then upload the **contents** of `dist/` to the domain's document
root. The build includes `public/.htaccess`, which enables Apache history-mode
routing, cache headers, and basic response headers. Apache `mod_rewrite` and
`mod_headers` should be enabled. For other hosts, configure an equivalent SPA
fallback in the hosting dashboard.

Point the domain to the hosting server and enable HTTPS there; DNS and SSL are
hosting configuration, not part of this frontend.

## Image optimization

Optimized WebP versions are checked in under `src/assets/optimized` and `public`.
After replacing source images, regenerate them and build:

```sh
npm run optimize:images
npm run build
```
