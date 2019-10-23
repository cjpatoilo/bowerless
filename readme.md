<a href="https://github.com/cjpatoilo/bowerless"><img width="100%" src="https://cjpatoilo.com/bowerless/artwork.png" alt="Bowerless - Generate bundles from npm dependencies."></a>

> Generate bundles from npm dependencies.

[![Travis Status](https://travis-ci.org/cjpatoilo/bowerless.svg?branch=master)](https://travis-ci.org/cjpatoilo/bowerless?branch=master)
[![AppVeyor Status](https://ci.appveyor.com/api/projects/status/cw249ount3qs2hou?svg=true)](https://ci.appveyor.com/project/cjpatoilo/bowerless)
[![Codacy Status](https://img.shields.io/codacy/grade/e9961d836078409c910329b9ac337994/master.svg)](https://www.codacy.com/app/cjpatoilo/bowerless/dashboard)
[![Dependencies Status](https://david-dm.org/cjpatoilo/bowerless.svg)](https://david-dm.org/cjpatoilo/bowerless)
[![Version Status](https://badge.fury.io/js/bowerless.svg)](https://www.npmjs.com/package/bowerless)
[![Download Status](https://img.shields.io/npm/dt/bowerless.svg)](https://www.npmjs.com/package/bowerless)
[![Gitter Chat](https://img.shields.io/badge/gitter-join_the_chat-4cc61e.svg)](https://gitter.im/cjpatoilo/bowerless)


## Why it's awesome

This library reads the package.json files for each of those dependencies. Based on these connections, it will generate a bundle of the master files.

*Note: For now only works with JavaScript and CSS files.*


## Getting Started

**Install with npm**

```
$ npm install -g bowerless
```

*Note: Install this npm package with `-g` to global use or with `-D` to add the package as a devDependency in the `package.json` file of your project.*


**Usage**

```
$ bowerless dist vendors
```


## CLI

```
$ bowerless --help

  Usage:

    $ bowerless <output> <filename> [<options>]

  Options:

    -h, --help              Display help information
    -v, --version           Output version

  Examples:

    $ bowerless
    $ bowerless dist vendors
```



## Contributing

Want to contribute? Follow these [recommendations](https://github.com/cjpatoilo/bowerless#contributing).


## License

Designed with ♥ by [CJ Patoilo](https://twitter.com/cjpatoilo). Licensed under the [MIT License](https://github.com/cjpatoilo/bowerless#license).
