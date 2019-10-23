'use strict'
const fs = require('fs')
const uglifyjs = require('uglify-js')
const uglifycss = require('uglifycss')

function js (output, files) {
	if (!files.length) return
	const file = uglifyjs.minify(files[0]).code
	fs.writeFileSync(`${output}.js`, file)
}

function css (output, files) {
	if (!files.length) return
	const file = uglifycss.processFiles(files, { uglyComments: true })
	fs.writeFileSync(`${output}.css`, file)
}

exports.css = css
exports.js = js
