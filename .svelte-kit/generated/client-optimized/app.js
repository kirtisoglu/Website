export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13')
];

export const server_loads = [];

export const dictionary = {
		"/(chrome)": [~4,[2]],
		"/(chrome)/about": [~5,[2]],
		"/(chrome)/blog": [6,[2]],
		"/(chrome)/research": [7,[2]],
		"/(chrome)/research/chicago-healthcare-network": [8,[2]],
		"/(fullscreen)/research/chicago-healthcare-network/dashboard": [12,[3]],
		"/(chrome)/research/falcom": [9,[2]],
		"/(fullscreen)/research/falcom/dashboard": [13,[3]],
		"/(chrome)/teaching": [10,[2]],
		"/(chrome)/tools": [11,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';