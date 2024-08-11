const staticDutySync = "dutysync-v1";
const assets = ["/", "index.html", "/css/styles.css", "/js/app.js", "contact.html", "dashboard.html"
  
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
      return fetch(fetchEvent.request)
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