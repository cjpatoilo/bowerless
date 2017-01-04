'use strict'
const message = `
$ bowerless --help

  Usage:

    $ bowerless <directory> [<options>]

  Options:

    -h, --help              Display help information
    -v, --version           Output version

  Examples:

    $ bowerless
    $ bowerless dist/lib
`

function help () {
	console.log(message)
	process.exit(1)
}

module.exports = help
