importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js"
);

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(/\.*$/, new workbox.strategies.NetworkFirst());

workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    new workbox.strategies.CacheFirst({
        cacheName: "image-cache",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 7 * 24 * 60 * 60
            })
        ]
    })
);

workbox.routing.registerRoute(
    /\.(?:css)$/,
    new workbox.strategies.CacheFirst({
        cacheName: "style-cache",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 24 * 60 * 60
            })
        ]
    })
);

workbox.routing.registerRoute(
    /https:\/\/cdn\.jsdelivr\.net\/npm\/halfmoon@1\.1\.1\/(?:css|js)\/(.+)\.(?:css|js)$/,
    new workbox.strategies.CacheFirst({
        cacheName: "halfmoon-cache",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 15 * 24 * 60 * 60
            })
        ]
    })
);

workbox.routing.registerRoute(
    /https:\/\/use\.fontawesome\.com\/releases\/v(\d+)\.(\d+)\.(\d+)\/(?:css|js)\/(.+)\.(?:css|js)$/,
    new workbox.strategies.CacheFirst({
        cacheName: "faw-cache",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 15 * 24 * 60 * 60
            })
        ]
    })
);
