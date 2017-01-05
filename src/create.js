'use strict'
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const shelljs = require('shelljs')
const exists = require('./exists')

function cache (source, pkg) {
	return new Promise((resolve, reject) => {
		try {
			rimraf.sync(source)
			exists.folder(source)
			fs.writeFileSync(`${source}/package.json`, fs.readFileSync(pkg))
			shelljs.exec(`cd ${source} && npm i --prod --ignore-script`)
			resolve()
		} catch (err) {
			reject(err)
		}
	})
}

function files (source) {
	source = source + '/node_modules'
	const files = fs.readdirSync(source)
		.map(data => path.resolve(source, data))
		.filter(data => fs.statSync(data).isDirectory())
		.filter(data => fs.statSync(`${data}/package.json`).isFile())
		.filter(data => require(`${data}/package.json`).main)
		.map(data => path.resolve(data, require(`${data}/package.json`).main))
		.filter(data => fs.statSync(data).isFile())
	return {
		js: files.filter(data => path.extname(data) === '.js'),
		css: files.filter(data => path.extname(data) === '.css')
	}
}

exports.cache = cache
exports.files = files
