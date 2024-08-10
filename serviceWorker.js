const staticDutify = "dutify-v1";
const assets = ["/", "/index.html", "/css/style.css", "/js/app.js", ];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticDutify).then((cache) => {
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
      return fetch(fetchEvent.request)
        .then((response) => {
          // Check if the request is cross-origin
          if (!response.ok && response.type === "opaque") {
            return new Response("Cross-Origin Request Blocked", {
              status: 403,
              statusText: "Cross-Origin Request Blocked",
            });
          }
          return response;
        })
        .catch(() => {
          return new Response("Network error occurred", {
            status: 408,
            statusText: "Network error",
          });
        });
    })
  );
});
