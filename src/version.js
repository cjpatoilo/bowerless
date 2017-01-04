'use strict'
const pkg = require('../package.json')

function version () {
	console.log(pkg.version)
	process.exit(1)
}

module.exports = version
