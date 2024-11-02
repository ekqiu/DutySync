const staticDutySync = "dutysync-v1";
const assets = [
  "/",
  "index.html",
  "contact.html",
  "dashboard.html",
  "features.html",
  "privacy.html",
  "tos.html",
  "/css/styles.css",
  "/js/app.js",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-152x152.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-1024x1024.svg",
  "/images/favicon.ico",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticDutySync).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      if (res) {
        return res;
      }
      return fetch(fetchEvent.request).catch((error) => {
        console.error("You are offline", error);
        return caches.match("offline.html");
      });
    })
  );
});

self.addEventListener("push", function (event) {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: data.icon,
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});
