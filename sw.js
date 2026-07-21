/* Buddymon service worker — offline PWA cache */
var V = "bmon-v0.22.26";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];
self.addEventListener("install", function(e){
  e.waitUntil(caches.open(V).then(function(c){ return c.addAll(ASSETS); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return k !== V; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;
  var url = new URL(req.url);
  var isHTML = req.mode === "navigate" || req.destination === "document"
    || url.pathname.endsWith("/") || url.pathname.endsWith(".html");
  if(isHTML){
    e.respondWith(
      fetch(req).then(function(r){
        var cp = r.clone(); caches.open(V).then(function(c){ c.put(req, cp); }); return r;
      }).catch(function(){ return caches.match(req).then(function(r){ return r || caches.match("./index.html"); }); })
    );
  } else {
    e.respondWith(caches.match(req).then(function(r){
      return r || fetch(req).then(function(rr){
        var cp = rr.clone(); caches.open(V).then(function(c){ c.put(req, cp); }); return rr;
      });
    }));
  }
});
