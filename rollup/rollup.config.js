import svelte from 'rollup-plugin-svelte';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
// import alias from 'rollup-plugin-alias';
import uglify from 'rollup-plugin-uglify';
import buble from 'rollup-plugin-buble';

const dev = !!process.env.DEV;

console.log( `creating ${dev ? 'development' : 'production'} bundle` );

export default {
	entry: 'client/main.js',
	dest: 'public/js/bundle.js',
	format: 'iife',
	plugins: [
		json(),
		// alias({
		// 	acorn: 'node_modules/acorn/dist/acorn.js',
		// 	acorn_loose: 'node_modules/acorn/dist/acorn_loose.js'
		// }),
		nodeResolve(),
		commonjs({
			namedExports: {
				'node_modules/acorn/dist/acorn.js': [ 'parse, tokenizer' ],
				'node_modules/acorn/dist/acorn_loose.js': [ 'parse_dammit', 'tokTypes' ]
			}
		}),
		svelte({
			// in development mode, we want to ship the CSS so that
			// changes to components don't result in a hash mismatch
			css: dev
		}),
		buble(),
		!dev && uglify()
	],
	sourceMap: true
};