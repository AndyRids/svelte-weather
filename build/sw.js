/* eslint-disable max-len */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable no-restricted-globals */

// name of cache for current version of service worker
const CACHE_NAME = 'svelte-weather-cache-v1';

const APP_FONT = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap';

const OFFLINE_URL = '/index.html';

// static URLs that can be copied from cache to cache.
const IMMUTABLE = [
  // HTML
  '/index.html',
  '/offline.html',
  // CSS
  '/style.css',
  // font
  APP_FONT,
  // favicons
  '/favicon.ico',
  // button icons
  '/icons/buttons/back.svg',
  '/icons/buttons/bookmark-add.svg',
  '/icons/buttons/bookmark-rem.svg',
  '/icons/buttons/gps.svg',
  '/icons/buttons/next.svg',
  '/icons/buttons/no-gps.svg',
  '/icons/buttons/search.svg',
  // card icons
  '/icons/cards/sunrise.svg',
  '/icons/cards/sunset.svg',
  '/icons/cards/feels-like.svg',
  '/icons/cards/humidity.svg',
  '/icons/cards/pressure.svg',
  '/icons/cards/uv.svg',
  '/icons/cards/visibility.svg',
  '/icons/cards/wind-speed.svg',
  // header icons
  '/icons/headers/pointer.svg',
  // weather icons
  '/icons/weather/01d.svg',
  '/icons/weather/01n.svg',
  '/icons/weather/02d.svg',
  '/icons/weather/02n.svg',
  '/icons/weather/03d.svg',
  '/icons/weather/03n.svg',
  '/icons/weather/04d.svg',
  '/icons/weather/04n.svg',
  '/icons/weather/09d.svg',
  '/icons/weather/09n.svg',
  '/icons/weather/10d.svg',
  '/icons/weather/10n.svg',
  '/icons/weather/11d.svg',
  '/icons/weather/11n.svg',
  '/icons/weather/13d.svg',
  '/icons/weather/13n.svg',
  '/icons/weather/50d.svg',
  '/icons/weather/50n.svg',
];

// URLs retrieved from the network for every new cache created
const MUTABLE = [];

// triggers when the service worker is first installed
self.addEventListener('install', (event) => {
  /**
   * waitUntil extends the lifetime of the 'install' event until the
   * passed promise resolves successfully. If the promise rejects, the
   * installation is considered a failure.
   */
  event.waitUntil(
    // open current cache version 'app-cache-v1'
    caches.open(CACHE_NAME).then((cache) => {
      // URLs in immutable not found in existing cache
      const newImmutable = [];
      // check each immutable URL presence in existing cache
      return Promise.all(
        /**
         * each URL from immutable found in the existing cache, has its entry copied
         * into the new cache. Those not found, are placed into the newImmutable array.
         */
        IMMUTABLE.map((url) => caches.match(url).then(
          (response) => (response ? cache.put(url, response) : (newImmutable.push(url), Promise.resolve()))
        ))
        /**
         * only fetch URLs from IMMUTABLE not found in existing cache (newImmutable) and URLs in
         * MUTABLE (files that change with each site version), before adding them to the new cache.
         * Any URLs present in existing cache maching those in IMMUTABLE, were already copied (put)
         * into the new cache.
         */
      ).then(() => {
        cache.addAll([...newImmutable, ...MUTABLE]);
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  // request object
  const { request } = event;

  // default action: cache first, fallback to network or offline
  event.respondWith(
    caches.match(request).then((response) => {
      // return response from cache if found
      if (response) return response;

      return fetch(request).catch(() => {
        caches.match(OFFLINE_URL).then((offline) => offline);
      });
    })
  );
});

/**
 * loop through all of the caches on the 'active' event
 * and delete any of the caches that are not defined in
 * the cacheAllowList array.
 */
self.addEventListener('activate', (event) => {
  // array of caches allowed to remain
  const cacheAllowList = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheAllowList.indexOf(cacheName) === -1)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});
