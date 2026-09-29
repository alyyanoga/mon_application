const CACHE_NAME = "mon-app-v1";

const FILES_TO_CACHE = [
    "./",
    "./connexion.html",
    "./dashboard.html",
    "./produits.html",
    "./style.css",
    "./script.js",
    "./manifest.json"
];


self.addEventListener("install", function (event) {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(function (cache) {

                return cache.addAll(
                    FILES_TO_CACHE
                );

            })

    );

});


self.addEventListener("fetch", function (event) {

    event.respondWith(

        caches.match(event.request)
            .then(function (response) {

                return response || fetch(event.request);

            })

    );

});
