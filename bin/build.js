#!/usr/bin/env node
'use strict';

const fs = require('fs');
const llparse = require('llparse');
const llparseDot = require('llparse-dot');

const prj = 'vprep';

const p = new llparse.LLParse(prj);

const verilogStart = p.node('verilogStart');
const verilog = p.node('verilog');
const directive = p.node('directive');
const userDefine = p.node('userDefine');
const define = p.node('define');
const include = p.node('include');
const filename = p.node('filename');
const default_nettype = p.node('default_nettype');

const verilogSpan = p.span(p.code.span('on_verilog'));

p.property('i8', 'on_zero_directive');
p.property('i8', 'on_id_directive');
p.property('i8', 'on_user_define');

const onZeroDirective = p.invoke(p.code.store('on_zero_directive'), verilogStart);
const onIdDirective = p.invoke(p.code.store('on_id_directive'), verilogStart);
const onDefaultNettype = p.invoke(p.code.store('on_default_nettype'), verilogStart);

// const onUserDefine = p.invoke(p.code.store('on_user_define'), verilogStart);

verilogStart
  .otherwise(verilogSpan.start(verilog));

verilog
  .peek('`', verilogSpan.end(directive))
  .skipTo(verilog);

directive
  .match('define', define)    /* 22.5.1 */
  .match('include', include)  /* 22.4 */
  // .match('__FILE__', __FILE__)               /* [22.13] */
  // .match('__LINE__', __LINE__)               /* [22.13] */
  // .match('line', line)                       /* [22.12] */
  // .match('pragma', pragma)                   /* [22.11] */
  // .match('timescale', timescale)             /* [22.7] */
  // .match('begin_keywords', begin_keywords)   /* 22.14 "string" */
  // .match('default_nettype', default_nettype) /* 22.8 */
  .select({
    resetall: 0,            /* 22-3 */
    // undefineall: 1,      /* 22.5.3 */
    endif: 2,               /* 22.6 */
    else: 3,                /* 22.6 */
    unconnected_drive: 4,   /* 22.9 */
    nounconnected_drive: 5, /* 22.9 */
    celldefine: 6,          /* 22.10 */
    endcelldefine: 7,       /* 22.10 */
    end_keywords: 8         /* 22.14 */
  }, onZeroDirective)
  .select({
    ifdef: 0,   /* 22.6 */
    ifndef: 1,  /* 22.6 */
    elsif: 2,   /* 22.6 */
    undef: 3    /* 22.5.2 */
  }, onIdDirective)
  .otherwise(userDefine);




userDefine
  .match([' ', '\t', '\n', '\r'], verilogStart)
  .skipTo(userDefine);

// .otherwise(p.error(1, 'Expected directive'));

define
  .otherwise(verilogStart);

include
  .otherwise(filename);

// TODO "filename" || <filename>
filename
  .otherwise(verilogStart);

default_nettype
  .select({
    wire: 0,
    tri: 1,
    tri0: 2,
    tri1: 3,
    wand: 4,
    triand: 5,
    wor: 6,
    trior: 7,
    trireg: 8,
    uwire: 9,
    none: 10
  }, onDefaultNettype)
  .otherwise(verilogStart);

// Build

const artifacts = p.build(verilogStart);

fs.writeFileSync(prj + '.h', artifacts.header);
// fs.writeFileSync('verilog_preprocessor.bc', artifacts.bitcode);
fs.writeFileSync(prj + '.c', artifacts.c);

const dot = new llparseDot.Dot();

fs.writeFileSync(prj + '.dot', dot.build(verilogStart));

/* eslint camelcase: 0 */
