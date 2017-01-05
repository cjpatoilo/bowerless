'use strict'
const message = `
$ bowerless --help

  Usage:

    $ bowerless <output> <filename> [<options>]

  Options:

    -h, --help              Display help information
    -v, --version           Output version

  Examples:

    $ bowerless
    $ bowerless dist vendors
`

function help () {
	console.log(message)
	process.exit(1)
}

module.exports = help
