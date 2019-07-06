'use strict';

const expect = require('chai').expect;
const lib = require('../lib/index.js');

describe('basic', () => {
  it('test', done => {
    expect(lib()).to.be.an('object');
    done();
  });
});

/* eslint-env mocha */
