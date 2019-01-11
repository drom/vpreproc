'use strict';

const expect = require('chai').expect;
const lib = require('../lib/index.js');

describe('basic', () => {
  it('version', done => {
    expect(lib.version()).to.eq('0.1.0');
    done();
  });
});

/* eslint-env mocha */
