export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","about/.DS_Store","about/booklist.md","about/bottom-content.md","about/intro.md","about/portrait.webp","alaittin-kirtisoglu-resume.pdf","data/MUA_SHP.zip","data/chicago/blocks.pmtiles","data/chicago/boundary.geojson","data/chicago/city_boundary.geojson","data/chicago/community_areas.geojson","data/chicago/community_areas_health.geojson","data/chicago/facilities.geojson","data/chicago/google_places.geojson","data/chicago/health_centers.geojson","data/chicago/health_zones.geojson","data/chicago/mua.geojson","data/chicago/tracts.geojson","favicon.ico","home/.DS_Store","home/6.png","news.json","vite.svg"]),
	mimeTypes: {".md":"text/markdown",".webp":"image/webp",".pdf":"application/pdf",".zip":"application/zip",".geojson":"application/geo+json",".png":"image/png",".json":"application/json",".svg":"image/svg+xml"},
	_: {
		client: null,
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/api/health-atlas/[...path]",
				pattern: /^\/api\/health-atlas(?:\/(.*))?\/?$/,
				params: [{"name":"path","optional":false,"rest":true,"chained":true}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/health-atlas/_...path_/_server.ts.js'))
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/research",
				pattern: /^\/research\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/research/chicago-healthcare-network",
				pattern: /^\/research\/chicago-healthcare-network\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(fullscreen)/research/chicago-healthcare-network/dashboard",
				pattern: /^\/research\/chicago-healthcare-network\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/research/falcom",
				pattern: /^\/research\/falcom\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/research/falcom/dashboard",
				pattern: /^\/research\/falcom\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/teaching",
				pattern: /^\/teaching\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
