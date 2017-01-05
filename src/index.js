'use strict'
const path = require('path')
const create = require('./create')
const exists = require('./exists')
const generate = require('./generate')

function bowerless (argv) {
	const name = argv[1] || 'bundle.min'
	const folder = path.resolve(argv[0]) || path.resolve('./')
	const output = path.resolve(`${folder}/${name}`)
	const pkg = path.resolve('./package.json')
	const source = path.resolve(__dirname, '../.cache')

	exists.pkg(pkg)
	create
		.cache(source, pkg)
		.then(() => {
			const bundles = create.files(source)
			exists.folder(folder)
			generate.js(output, bundles.js)
			generate.css(output, bundles.css)
		})
}

module.exports = bowerless
