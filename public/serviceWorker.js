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
    /https:\/\/cdn\.jsdelivr\.net\/(.+)\/(.+)@(.+)\/(.+)\.(?:css|js)$/,
    new workbox.strategies.CacheFirst({
        cacheName: "jsdeliver-cdn-cache",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 15 * 24 * 60 * 60
            })
        ]
    })
);

workbox.routing.registerRoute(
    /https:\/\/cdn\.jsdelivr\.net\/(.+)\/(.+)@(.+)\/(.+)\.(?:woff(2*))$/,
    new workbox.strategies.CacheFirst({
        cacheName: "jsdeliver-font-cache",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 15 * 24 * 60 * 60
            })
        ]
    })
);
