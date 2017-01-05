'use strict'
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

function folder (folder) {
	if (!fs.existsSync(folder)) mkdirp.sync(folder)
}

function pkg (pkg) {
	if (fs.statSync(pkg).isFile()) pkg = require(pkg)
	if (pkg.dependencies && Object.keys(pkg.dependencies).length) return
	console.error('[error] Sorry, this script requires dependencies from your package.json')
	process.exit(1)
}

exports.folder = folder
exports.pkg = pkg
