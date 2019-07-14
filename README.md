[![Build Status](https://travis-ci.org/drom/vpreproc.svg?branch=master)](https://travis-ci.org/drom/vpreproc)
[![npm version](https://badge.fury.io/js/vpreproc.svg)](https://badge.fury.io/js/vpreproc)

Streaming SystemVerilog preprocessor

## Features
  * async
  * streaming
  * source maps https://github.com/mozilla/source-map

## Use

Using [llparse](https://github.com/nodejs/llparse) to generate preprocessor.

```
npm i
node bin/build.js
```

Result files are:

```
verilog_preprocessor.h
verilog_preprocessor.c
verilog_preprocessor.bc
verilog_preprocessor.dot
```

## Testing

```
npm test
```

### Inspired by:
  * https://www.veripool.org/papers/Preproc_Good_Evil_SNUGBos10_paper.pdf
  * [Verilog-Perl](https://www.veripool.org/wiki/verilog-perl)
  * https://github.com/creationix/jsonparse
  * https://github.com/Floby/node-json-streams
  * https://github.com/ParksProjets/C-Preprocessor
  * https://github.com/acgessler/cpp.js/
  * https://github.com/jimhigson/oboe.js
  * https://github.com/uhop/stream-json
  * https://github.com/dscape/clarinet
  * https://github.com/isaacs/sax-js
  * https://www.sweetjs.org/


### License

MIT [LICENSE](LICENSE)
