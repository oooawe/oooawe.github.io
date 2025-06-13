if (!self.define) {
	let e, s = {};
	const n = (n, i) => (
		n = new URL(n + ".js", i).href,
		s[n] || new Promise((s => {
			if ("document" in self) {
				const e = document.createElement("script");
				e.src = n;
				e.onload = s;
				document.head.appendChild(e);
			} else {
				e = n;
				importScripts(n);
				s();
			}
		})).then(() => {
			let e = s[n];
			if (!e) throw new Error(`Module ${n} didn't register its module`);
			return e;
		})
	);

	self.define = (i, c) => {
		const t = e || ("document" in self ? document.currentScript.src : "") || location.href;
		if (s[t]) return;
		let r = {};
		const o = e => n(e, t);
		const l = {
			module: { uri: t },
			exports: r,
			require: o
		};
		s[t] = Promise.all(i.map(e => l[e] || o(e))).then(e => (c(...e), r));
	};
}

define(["./workbox-5ffe50d4"], (function(e) {
	"use strict";
	
	self.skipWaiting();
	e.clientsClaim();
	
	e.precacheAndRoute([
		{
			url: "index.html",
			revision: "83fe404d786bcfafb9add881247de6c5"
		},
		{
			url: "manifest.webmanifest",
			revision: "a6d9bdd324c4e2f09b877c5ba6c6219c"
		},
		{
			url: "lab/lab-entry-CSSD1G2T1ZE.css",
			revision: "2a5d3be2ecdc6f1b513ad5843f953568"
		},
		{
			url: "lab/lab-entry-JSBc8YtrEf.js",
			revision: "41c08afd7bf196897bc421658f2c5c0a"
		},
		{
			url: "assets/icons/apple-touch-icon.png",
			revision: "ec0ef44863c6aa0540dfebb0198ce741"
		},
		{
			url: "assets/icons/manifest-192.png",
			revision: "0eee5532146d296e9a7bcd0989ea9797"
		},
		{
			url: "assets/icons/manifest-512.png",
			revision: "434cae1c73ace0aabb85460e45f35af5"
		}
	], {});

	e.cleanupOutdatedCaches();
	e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")));
}));
