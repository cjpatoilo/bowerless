'use strict'
const path = require('path')
const create = require('./create')
const exists = require('./exists')
const generate = require('./generate')

function bowerless (argv) {
	const folder = argv[0] || '../../../output'
	const name = argv[1] || 'bundle.min'
	const output = path.resolve(`${folder}/${name}`)
	const pkg = path.resolve('../../../package.json')
	const source = path.resolve('../.cache')

	exists.pkg(pkg)
	create.cache(source, pkg)
	exists.folder(folder)

	const bundles = create.files(source)
	generate.js(output, bundles.js)
	generate.css(output, bundles.css)
}

module.exports = bowerless
