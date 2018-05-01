#!/usr/bin/env node
'use strict'
const pkg = require('./package.json')
const rasper = require('rasper')
const bowerless = require('./index')
const options = rasper()

if (options.version || options.v) version()
if (options.help || options.h) help()
bowerless(options)

function version () {
	console.log(pkg.version)
	process.exit(1)
}

function help () {
	console.log(`
$ bowerless --help

  Usage:

    $ bowerless <output> <filename> [<options>]

  Options:

    -h, --help              Display help information
    -v, --version           Output version

  Examples:

    $ bowerless
    $ bowerless dist vendors
`)
	process.exit(0)
}
