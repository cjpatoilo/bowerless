#!/usr/bin/env node
'use strict'
const fs = require('fs')
const path = require('path')
const shelljs = require('shelljs')
const mkdirp = require('mkdirp')
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

	const max = getDirectories(`${cache}/node_modules`).length
	let count = 1
	let cssBundle = []
	let jsBundle = []

	if (!fs.existsSync(directory)) mkdirp.sync(directory)
	globbies(path.resolve(`${cache}/node_modules/**/package.json`), file => {
		let main = `${path.dirname(file)}/${require(file).main}`
		if (path.extname(main) === '.css') cssBundle.push(main)
		if (path.extname(main) === '.js') jsBundle.push(main)
		if (max === count++) {
			concat(cssBundle, `${directory}/bundle.min.css`)
			concat(jsBundle, `${directory}/bundle.min.js`)
		}
	})
}

function getDirectories (srcpath) {
	return fs.readdirSync(srcpath).filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
}

module.exports = bowerless
