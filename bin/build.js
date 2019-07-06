#!/usr/bin/env node
'use strict';

const fs = require('fs');
const llparse = require('llparse');
const llparseDot = require('llparse-dot');

const prj = 'vprep';

const p = new llparse.LLParse(prj);

const start = p.node('start');
const verilog = p.node('verilog');
const directives = p.node('directives');

const verilogSpan = p.span(p.code.span('on_verilog'));

p.property('i8', 'on_zero_directive');

const zeroDirective = p.invoke(
  p.code.store('on_zero_directive'), start
);

start
  .otherwise(verilogSpan.start(verilog));

verilog
  .peek('`', verilogSpan.end(directives))
  .skipTo(verilog);

directives
  .select({
    resetall: 0, /* 22-3 */
    undefineall: 1, /* 22-5-3 */
    endif: 2,
    else: 3,
    unconnected_drive: 4, /* 22-9 */
    nounconnected_drive: 5,
    celldefine: 6, /* 22-10 */
    endcelldefine: 7
  }, zeroDirective)
  // .select({
  //   ifdef: 0,
  //   ifndef: 1,
  //   elsif: 2,
  //   undef: 3 /* 22-5-2 */
  // }, onIdDirective)
  // .match('define', onDefine)
  // .match('include', onInclude)
  .otherwise(p.error(1, 'Expected directive'));

// Build

const artifacts = p.build(start);

fs.writeFileSync(prj + '.h', artifacts.header);
// fs.writeFileSync('verilog_preprocessor.bc', artifacts.bitcode);
fs.writeFileSync(prj + '.c', artifacts.c);

const dot = new llparseDot.Dot();

fs.writeFileSync(prj + '.dot', dot.build(start));

/* eslint camelcase: 0 */
