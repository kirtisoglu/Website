(function () {
	'use strict';

	// This file is generated by Sapper — do not edit it!
	const timestamp = 1623834314145;

	const files = [
		"service-worker-index.html",
		".DS_Store",
		"CNAME",
		"Measuring_Alignment_of_Online_Grassroots_Political_Communities_with_Political_Campaigns.pdf",
		"cameron-raymond-resume.pdf",
		"content/rl-for-traffic-flow/1918-spanish-flu.jpg",
		"content/rl-for-traffic-flow/CO2_LoopRoute_EGreedy.png",
		"content/rl-for-traffic-flow/CO2_LoopRoute_Softmax.png",
		"content/rl-for-traffic-flow/CO2_NormalRoute_EGreedy.png",
		"content/rl-for-traffic-flow/CO2_NormalRoute_Softmax.png",
		"content/rl-for-traffic-flow/DailyAvg_LoopRoute_EGreedy.png",
		"content/rl-for-traffic-flow/DailyAvg_LoopRoute_Softmax.png",
		"content/rl-for-traffic-flow/DailyAvg_NormalRoute_EGreedy.png",
		"content/rl-for-traffic-flow/DailyAvg_NormalRoute_Softmax.png",
		"content/rl-for-traffic-flow/OneDay_NormalRoute_EGreedy.png",
		"content/rl-for-traffic-flow/showcase.gif",
		"content/rl-for-traffic-flow/traffic-setup.png",
		"favicon.png",
		"global.css",
		"intro.svg",
		"logo-150.png",
		"logo-310.png",
		"manifest.json",
		"networkd.png",
		"portrait.png",
		"portrait.webp",
		"robots.txt",
		"summary_about_large.png",
		"summary_large_image.png",
		"tags/.DS_Store",
		"tags/bp.png",
		"tags/bp.webp",
		"tags/gt.png",
		"tags/gt.webp",
		"tags/ml.png",
		"tags/ml.webp",
		"tags/nlp.png",
		"tags/nlp.webp",
		"tags/pl.png",
		"tags/pl.webp",
		"tags/rl.png",
		"tags/rl.webp",
		"tags/rp.png",
		"tags/rp.webp",
		"tags/sp.png",
		"tags/sp.webp"
	];

	const shell = [
		"client/client.9d30e9a4.js",
		"client/Tag.3e6d6c99.js",
		"client/PostFilter.5019909b.js",
		"client/index.42ad53af.js",
		"client/index.f01c3fe8.js",
		"client/index.8ee63f0f.js",
		"client/[slug].7b3a7989.js",
		"client/sapper-dev-client.1e7a4a5e.js",
		"client/client.84f03898.js"
	];

	const ASSETS = `cache${timestamp}`;

	// `shell` is an array of all the files generated by the bundler,
	// `files` is an array of everything in the `static` directory
	const to_cache = shell.concat(files);
	const cached = new Set(to_cache);

	self.addEventListener('install', event => {
		event.waitUntil(
			caches
				.open(ASSETS)
				.then(cache => cache.addAll(to_cache))
				.then(() => {
					self.skipWaiting();
				})
		);
	});

	self.addEventListener('activate', event => {
		event.waitUntil(
			caches.keys().then(async keys => {
				// delete old caches
				for (const key of keys) {
					if (key !== ASSETS) await caches.delete(key);
				}

				self.clients.claim();
			})
		);
	});

	self.addEventListener('fetch', event => {
		if (event.request.method !== 'GET' || event.request.headers.has('range')) return;

		const url = new URL(event.request.url);

		// don't try to handle e.g. data: URIs
		if (!url.protocol.startsWith('http')) return;

		// ignore dev server requests
		if (url.hostname === self.location.hostname && url.port !== self.location.port) return;

		// always serve static files and bundler-generated assets from cache
		if (url.host === self.location.host && cached.has(url.pathname)) {
			event.respondWith(caches.match(event.request));
			return;
		}

		// for pages, you might want to serve a shell `service-worker-index.html` file,
		// which Sapper has generated for you. It's not right for every
		// app, but if it's right for yours then uncomment this section
		/*
		if (url.origin === self.origin && routes.find(route => route.pattern.test(url.pathname))) {
			event.respondWith(caches.match('/service-worker-index.html'));
			return;
		}
		*/

		if (event.request.cache === 'only-if-cached') return;

		// for everything else, try the network first, falling back to
		// cache if the user is offline. (If the pages never change, you
		// might prefer a cache-first approach to a network-first one.)
		event.respondWith(
			caches
				.open(`offline${timestamp}`)
				.then(async cache => {
					try {
						const response = await fetch(event.request);
						cache.put(event.request, response.clone());
						return response;
					} catch(err) {
						const response = await cache.match(event.request);
						if (response) return response;

						throw err;
					}
				})
		);
	});

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS13b3JrZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9zZXJ2aWNlLXdvcmtlci5qcyIsIi4uLy4uL3NyYy9zZXJ2aWNlLXdvcmtlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IFNhcHBlciDigJQgZG8gbm90IGVkaXQgaXQhXG5leHBvcnQgY29uc3QgdGltZXN0YW1wID0gMTYyMzgzNDMxNDE0NTtcblxuZXhwb3J0IGNvbnN0IGZpbGVzID0gW1xuXHRcInNlcnZpY2Utd29ya2VyLWluZGV4Lmh0bWxcIixcblx0XCIuRFNfU3RvcmVcIixcblx0XCJDTkFNRVwiLFxuXHRcIk1lYXN1cmluZ19BbGlnbm1lbnRfb2ZfT25saW5lX0dyYXNzcm9vdHNfUG9saXRpY2FsX0NvbW11bml0aWVzX3dpdGhfUG9saXRpY2FsX0NhbXBhaWducy5wZGZcIixcblx0XCJjYW1lcm9uLXJheW1vbmQtcmVzdW1lLnBkZlwiLFxuXHRcImNvbnRlbnQvcmwtZm9yLXRyYWZmaWMtZmxvdy8xOTE4LXNwYW5pc2gtZmx1LmpwZ1wiLFxuXHRcImNvbnRlbnQvcmwtZm9yLXRyYWZmaWMtZmxvdy9DTzJfTG9vcFJvdXRlX0VHcmVlZHkucG5nXCIsXG5cdFwiY29udGVudC9ybC1mb3ItdHJhZmZpYy1mbG93L0NPMl9Mb29wUm91dGVfU29mdG1heC5wbmdcIixcblx0XCJjb250ZW50L3JsLWZvci10cmFmZmljLWZsb3cvQ08yX05vcm1hbFJvdXRlX0VHcmVlZHkucG5nXCIsXG5cdFwiY29udGVudC9ybC1mb3ItdHJhZmZpYy1mbG93L0NPMl9Ob3JtYWxSb3V0ZV9Tb2Z0bWF4LnBuZ1wiLFxuXHRcImNvbnRlbnQvcmwtZm9yLXRyYWZmaWMtZmxvdy9EYWlseUF2Z19Mb29wUm91dGVfRUdyZWVkeS5wbmdcIixcblx0XCJjb250ZW50L3JsLWZvci10cmFmZmljLWZsb3cvRGFpbHlBdmdfTG9vcFJvdXRlX1NvZnRtYXgucG5nXCIsXG5cdFwiY29udGVudC9ybC1mb3ItdHJhZmZpYy1mbG93L0RhaWx5QXZnX05vcm1hbFJvdXRlX0VHcmVlZHkucG5nXCIsXG5cdFwiY29udGVudC9ybC1mb3ItdHJhZmZpYy1mbG93L0RhaWx5QXZnX05vcm1hbFJvdXRlX1NvZnRtYXgucG5nXCIsXG5cdFwiY29udGVudC9ybC1mb3ItdHJhZmZpYy1mbG93L09uZURheV9Ob3JtYWxSb3V0ZV9FR3JlZWR5LnBuZ1wiLFxuXHRcImNvbnRlbnQvcmwtZm9yLXRyYWZmaWMtZmxvdy9zaG93Y2FzZS5naWZcIixcblx0XCJjb250ZW50L3JsLWZvci10cmFmZmljLWZsb3cvdHJhZmZpYy1zZXR1cC5wbmdcIixcblx0XCJmYXZpY29uLnBuZ1wiLFxuXHRcImdsb2JhbC5jc3NcIixcblx0XCJpbnRyby5zdmdcIixcblx0XCJsb2dvLTE1MC5wbmdcIixcblx0XCJsb2dvLTMxMC5wbmdcIixcblx0XCJtYW5pZmVzdC5qc29uXCIsXG5cdFwibmV0d29ya2QucG5nXCIsXG5cdFwicG9ydHJhaXQucG5nXCIsXG5cdFwicG9ydHJhaXQud2VicFwiLFxuXHRcInJvYm90cy50eHRcIixcblx0XCJzdW1tYXJ5X2Fib3V0X2xhcmdlLnBuZ1wiLFxuXHRcInN1bW1hcnlfbGFyZ2VfaW1hZ2UucG5nXCIsXG5cdFwidGFncy8uRFNfU3RvcmVcIixcblx0XCJ0YWdzL2JwLnBuZ1wiLFxuXHRcInRhZ3MvYnAud2VicFwiLFxuXHRcInRhZ3MvZ3QucG5nXCIsXG5cdFwidGFncy9ndC53ZWJwXCIsXG5cdFwidGFncy9tbC5wbmdcIixcblx0XCJ0YWdzL21sLndlYnBcIixcblx0XCJ0YWdzL25scC5wbmdcIixcblx0XCJ0YWdzL25scC53ZWJwXCIsXG5cdFwidGFncy9wbC5wbmdcIixcblx0XCJ0YWdzL3BsLndlYnBcIixcblx0XCJ0YWdzL3JsLnBuZ1wiLFxuXHRcInRhZ3Mvcmwud2VicFwiLFxuXHRcInRhZ3MvcnAucG5nXCIsXG5cdFwidGFncy9ycC53ZWJwXCIsXG5cdFwidGFncy9zcC5wbmdcIixcblx0XCJ0YWdzL3NwLndlYnBcIlxuXTtcbmV4cG9ydCB7IGZpbGVzIGFzIGFzc2V0cyB9OyAvLyBsZWdhY3lcblxuZXhwb3J0IGNvbnN0IHNoZWxsID0gW1xuXHRcImNsaWVudC9jbGllbnQuOWQzMGU5YTQuanNcIixcblx0XCJjbGllbnQvVGFnLjNlNmQ2Yzk5LmpzXCIsXG5cdFwiY2xpZW50L1Bvc3RGaWx0ZXIuNTAxOTkwOWIuanNcIixcblx0XCJjbGllbnQvaW5kZXguNDJhZDUzYWYuanNcIixcblx0XCJjbGllbnQvaW5kZXguZjAxYzNmZTguanNcIixcblx0XCJjbGllbnQvaW5kZXguOGVlNjNmMGYuanNcIixcblx0XCJjbGllbnQvW3NsdWddLjdiM2E3OTg5LmpzXCIsXG5cdFwiY2xpZW50L3NhcHBlci1kZXYtY2xpZW50LjFlN2E0YTVlLmpzXCIsXG5cdFwiY2xpZW50L2NsaWVudC44NGYwMzg5OC5qc1wiXG5dO1xuXG5leHBvcnQgY29uc3Qgcm91dGVzID0gW1xuXHR7IHBhdHRlcm46IC9eXFwvJC8gfSxcblx0eyBwYXR0ZXJuOiAvXlxcL2Fib3V0XFwvPyQvIH0sXG5cdHsgcGF0dGVybjogL15cXC9ibG9nXFwvPyQvIH0sXG5cdHsgcGF0dGVybjogL15cXC9ibG9nXFwvKFteXFwvXSs/KVxcLz8kLyB9XG5dOyIsImltcG9ydCB7IHRpbWVzdGFtcCwgZmlsZXMsIHNoZWxsLCByb3V0ZXMgfSBmcm9tICdAc2FwcGVyL3NlcnZpY2Utd29ya2VyJztcblxuY29uc3QgQVNTRVRTID0gYGNhY2hlJHt0aW1lc3RhbXB9YDtcblxuLy8gYHNoZWxsYCBpcyBhbiBhcnJheSBvZiBhbGwgdGhlIGZpbGVzIGdlbmVyYXRlZCBieSB0aGUgYnVuZGxlcixcbi8vIGBmaWxlc2AgaXMgYW4gYXJyYXkgb2YgZXZlcnl0aGluZyBpbiB0aGUgYHN0YXRpY2AgZGlyZWN0b3J5XG5jb25zdCB0b19jYWNoZSA9IHNoZWxsLmNvbmNhdChmaWxlcyk7XG5jb25zdCBjYWNoZWQgPSBuZXcgU2V0KHRvX2NhY2hlKTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgZXZlbnQgPT4ge1xuXHRldmVudC53YWl0VW50aWwoXG5cdFx0Y2FjaGVzXG5cdFx0XHQub3BlbihBU1NFVFMpXG5cdFx0XHQudGhlbihjYWNoZSA9PiBjYWNoZS5hZGRBbGwodG9fY2FjaGUpKVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRzZWxmLnNraXBXYWl0aW5nKCk7XG5cdFx0XHR9KVxuXHQpO1xufSk7XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignYWN0aXZhdGUnLCBldmVudCA9PiB7XG5cdGV2ZW50LndhaXRVbnRpbChcblx0XHRjYWNoZXMua2V5cygpLnRoZW4oYXN5bmMga2V5cyA9PiB7XG5cdFx0XHQvLyBkZWxldGUgb2xkIGNhY2hlc1xuXHRcdFx0Zm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuXHRcdFx0XHRpZiAoa2V5ICE9PSBBU1NFVFMpIGF3YWl0IGNhY2hlcy5kZWxldGUoa2V5KTtcblx0XHRcdH1cblxuXHRcdFx0c2VsZi5jbGllbnRzLmNsYWltKCk7XG5cdFx0fSlcblx0KTtcbn0pO1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgZXZlbnQgPT4ge1xuXHRpZiAoZXZlbnQucmVxdWVzdC5tZXRob2QgIT09ICdHRVQnIHx8IGV2ZW50LnJlcXVlc3QuaGVhZGVycy5oYXMoJ3JhbmdlJykpIHJldHVybjtcblxuXHRjb25zdCB1cmwgPSBuZXcgVVJMKGV2ZW50LnJlcXVlc3QudXJsKTtcblxuXHQvLyBkb24ndCB0cnkgdG8gaGFuZGxlIGUuZy4gZGF0YTogVVJJc1xuXHRpZiAoIXVybC5wcm90b2NvbC5zdGFydHNXaXRoKCdodHRwJykpIHJldHVybjtcblxuXHQvLyBpZ25vcmUgZGV2IHNlcnZlciByZXF1ZXN0c1xuXHRpZiAodXJsLmhvc3RuYW1lID09PSBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lICYmIHVybC5wb3J0ICE9PSBzZWxmLmxvY2F0aW9uLnBvcnQpIHJldHVybjtcblxuXHQvLyBhbHdheXMgc2VydmUgc3RhdGljIGZpbGVzIGFuZCBidW5kbGVyLWdlbmVyYXRlZCBhc3NldHMgZnJvbSBjYWNoZVxuXHRpZiAodXJsLmhvc3QgPT09IHNlbGYubG9jYXRpb24uaG9zdCAmJiBjYWNoZWQuaGFzKHVybC5wYXRobmFtZSkpIHtcblx0XHRldmVudC5yZXNwb25kV2l0aChjYWNoZXMubWF0Y2goZXZlbnQucmVxdWVzdCkpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIGZvciBwYWdlcywgeW91IG1pZ2h0IHdhbnQgdG8gc2VydmUgYSBzaGVsbCBgc2VydmljZS13b3JrZXItaW5kZXguaHRtbGAgZmlsZSxcblx0Ly8gd2hpY2ggU2FwcGVyIGhhcyBnZW5lcmF0ZWQgZm9yIHlvdS4gSXQncyBub3QgcmlnaHQgZm9yIGV2ZXJ5XG5cdC8vIGFwcCwgYnV0IGlmIGl0J3MgcmlnaHQgZm9yIHlvdXJzIHRoZW4gdW5jb21tZW50IHRoaXMgc2VjdGlvblxuXHQvKlxuXHRpZiAodXJsLm9yaWdpbiA9PT0gc2VsZi5vcmlnaW4gJiYgcm91dGVzLmZpbmQocm91dGUgPT4gcm91dGUucGF0dGVybi50ZXN0KHVybC5wYXRobmFtZSkpKSB7XG5cdFx0ZXZlbnQucmVzcG9uZFdpdGgoY2FjaGVzLm1hdGNoKCcvc2VydmljZS13b3JrZXItaW5kZXguaHRtbCcpKTtcblx0XHRyZXR1cm47XG5cdH1cblx0Ki9cblxuXHRpZiAoZXZlbnQucmVxdWVzdC5jYWNoZSA9PT0gJ29ubHktaWYtY2FjaGVkJykgcmV0dXJuO1xuXG5cdC8vIGZvciBldmVyeXRoaW5nIGVsc2UsIHRyeSB0aGUgbmV0d29yayBmaXJzdCwgZmFsbGluZyBiYWNrIHRvXG5cdC8vIGNhY2hlIGlmIHRoZSB1c2VyIGlzIG9mZmxpbmUuIChJZiB0aGUgcGFnZXMgbmV2ZXIgY2hhbmdlLCB5b3Vcblx0Ly8gbWlnaHQgcHJlZmVyIGEgY2FjaGUtZmlyc3QgYXBwcm9hY2ggdG8gYSBuZXR3b3JrLWZpcnN0IG9uZS4pXG5cdGV2ZW50LnJlc3BvbmRXaXRoKFxuXHRcdGNhY2hlc1xuXHRcdFx0Lm9wZW4oYG9mZmxpbmUke3RpbWVzdGFtcH1gKVxuXHRcdFx0LnRoZW4oYXN5bmMgY2FjaGUgPT4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZXZlbnQucmVxdWVzdCk7XG5cdFx0XHRcdFx0Y2FjaGUucHV0KGV2ZW50LnJlcXVlc3QsIHJlc3BvbnNlLmNsb25lKCkpO1xuXHRcdFx0XHRcdHJldHVybiByZXNwb25zZTtcblx0XHRcdFx0fSBjYXRjaChlcnIpIHtcblx0XHRcdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhY2hlLm1hdGNoKGV2ZW50LnJlcXVlc3QpO1xuXHRcdFx0XHRcdGlmIChyZXNwb25zZSkgcmV0dXJuIHJlc3BvbnNlO1xuXG5cdFx0XHRcdFx0dGhyb3cgZXJyO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHQpO1xufSk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0NBQUE7Q0FDTyxNQUFNLFNBQVMsR0FBRyxhQUFhLENBQUM7QUFDdkM7Q0FDTyxNQUFNLEtBQUssR0FBRztDQUNyQixDQUFDLDJCQUEyQjtDQUM1QixDQUFDLFdBQVc7Q0FDWixDQUFDLE9BQU87Q0FDUixDQUFDLDZGQUE2RjtDQUM5RixDQUFDLDRCQUE0QjtDQUM3QixDQUFDLGtEQUFrRDtDQUNuRCxDQUFDLHVEQUF1RDtDQUN4RCxDQUFDLHVEQUF1RDtDQUN4RCxDQUFDLHlEQUF5RDtDQUMxRCxDQUFDLHlEQUF5RDtDQUMxRCxDQUFDLDREQUE0RDtDQUM3RCxDQUFDLDREQUE0RDtDQUM3RCxDQUFDLDhEQUE4RDtDQUMvRCxDQUFDLDhEQUE4RDtDQUMvRCxDQUFDLDREQUE0RDtDQUM3RCxDQUFDLDBDQUEwQztDQUMzQyxDQUFDLCtDQUErQztDQUNoRCxDQUFDLGFBQWE7Q0FDZCxDQUFDLFlBQVk7Q0FDYixDQUFDLFdBQVc7Q0FDWixDQUFDLGNBQWM7Q0FD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
