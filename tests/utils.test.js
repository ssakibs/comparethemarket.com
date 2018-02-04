const chai = require('chai');

const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;

const sinon = require('sinon');

const sinonChai = require('sinon-chai');

const assert = require('assert');

chai.use(sinonChai);

const utils = require('../utils');

chai.use(chaiAsPromised);

describe('isPrime', () => {
  it('1 as input should return false', () => {
    expect(utils.isPrime(1)).to.equal(false);
  });
  it('2 as input should return true', () => {
    expect(utils.isPrime(2)).to.equal(true);
  });
  it('331 as input should return true', () => {
    expect(utils.isPrime(331)).to.equal(true);
  });
  it('4 as input should return false', () => {
    expect(utils.isPrime(4)).to.equal(false);
  });
  it('468 as input should return false', () => {
    expect(utils.isPrime(4)).to.equal(false);
  });
});

describe('processResult', () => {
  it('Check if console is invoked', () => {
    const spy = sinon.spy(console, 'log');
    utils.processResult({ morning: 2 });
    assert(spy.calledWith('morning : 2 --> Prime number'));
    spy.restore();
  });
});

