#!/usr/bin/env node
'use strict'
const fs = require('fs')
const path = require('path')
const shelljs = require('shelljs')
const concat = require('concat-files')
const globbies = require('globbies')
const cache = path.resolve(__dirname, '../.cache')
const dirname = path.resolve(__dirname, '../../..')
const pkg = require(`${dirname}/package.json`)

if (!pkg || !pkg.dependencies) {
	console.error('[error] Sorry, this script requires dependencies from your package.json')
	process.exit(1)
}

function bowerless (argv) {
	const directory = argv[0] || dirname

	shelljs
		.exec(`rm -rf node_modules/bowerless/.cache`)
		.exec(`mkdir -p ${cache}`)
		.exec(`cp -r package.json ${cache}/package.json`)
		.exec(`cd ${cache} && npm i --prod --ignore-script`)

	if (fs.existsSync(`${directory}/bundle.min.js`)) fs.unlinkSync(`${directory}/bundle.min.js`)
	if (fs.existsSync(`${directory}/bundle.min.css`)) fs.unlinkSync(`${directory}/bundle.min.css`)

	if (!fs.existsSync(directory)) fs.mkdirSync(directory)
	globbies(path.resolve(`${cache}/node_modules/**/package.json`), file => {
		let main = `${path.dirname(file)}/${require(file).main}`
		let bundle = `${directory}/bundle.min${path.extname(main)}`

		if (fs.existsSync(bundle)) concat([bundle, main], bundle)
		else concat([main], bundle)
	})
}

module.exports = bowerless
