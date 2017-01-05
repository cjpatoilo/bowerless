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

function bowerless (argv) {
	const bundle = 'bundle.min'
	const directory = argv[0] || dirname

	createCache()

	if (fs.existsSync(`${directory}/${bundle}.js`)) fs.unlinkSync(`${directory}/${bundle}.js`)
	if (fs.existsSync(`${directory}/${bundle}.css`)) fs.unlinkSync(`${directory}/${bundle}.css`)

	const max = getDirectories(`${cache}/node_modules`).length
	let count = 1
	let cssBundle = []
	let jsBundle = []

	if (!fs.existsSync(directory)) mkdirp.sync(directory)
	globbies(path.resolve(`${cache}/node_modules/**/package.json`), file => {
		const main = `${path.dirname(file)}/${require(file).main}`
		if (path.extname(main) === '.css') cssBundle.push(main)
		if (path.extname(main) === '.js') jsBundle.push(main)
		if (max === count++) {
			concat(cssBundle, `${directory}/${bundle}.css`)
			concat(jsBundle, `${directory}/${bundle}.js`)
		}
	})
}

function getDirectories (srcpath) {
	return fs.readdirSync(srcpath).filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
}

function hasDependencies () {
	return (pkg && pkg.dependencies && Object.keys(pkg.dependencies).length)
}

function createCache () {
	shelljs
		.exec(`rm -rf node_modules/bowerless/.cache`)
		.exec(`mkdir -p ${cache}`)
		.exec(`cp -r package.json ${cache}/package.json`)
		.exec(`cd ${cache} && npm i --prod --ignore-script`)
}

module.exports = bowerless
module.exports.hasDependencies = hasDependencies
