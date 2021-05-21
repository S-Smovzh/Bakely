import { precacheAndRoute } from 'workbox-precaching';
import { CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { registerRoute } from 'workbox-routing';
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 7 * 24 * 60 * 60
      })
    ]
  })
);

registerRoute(({ request, url }) => request.mode === 'navigate' && url.pathname.includes('/shop/'),
  new CacheFirst({
    cacheName: 'shop-cache',
    matchOptions: {
      ignoreVary: true
    },
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 1800,
        purgeOnQuotaError: true
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
);

registerRoute(({ url }) => url.origin === 'https://s-s-a.bakely.herokuapp.com',
  new CacheFirst({
    cacheName: 'medium-cache',
    matchOptions: {
      ignoreVary: true
    },
    plugins: [
      new ExpirationPlugin({
        maxEntries: 300,
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
    clientsClaim();
  }
});
