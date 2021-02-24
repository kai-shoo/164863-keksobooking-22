'use strict';
/* eslint-disable */

describe('randomizeInRange', function () {
  function makeTest(min, max, precision) {
    assert.isAtLeast(randomizeInRange(min, max, precision), min);
    assert.isAtMost(randomizeInRange(min, max, precision), max);
  }

  describe('value check  --no-precision', function () {
    it('0.1 - 2.9', function () {
      for (let x = 1; x <= 50; x++) {
        makeTest(0.1, 2.9);
      }
    });
    it('0.1 - 1.5', function () {
      for (let x = 1; x <= 50; x++) {
        makeTest(0.1, 1.5);
      }
    });
    it('0, 100', function () {
      for (let x = 1; x <= 50; x++) {
        makeTest(0, 100);
      }
    });
  });

  describe('value check  --precision', function () {
    it('1.1, 1.5, 1', function () {
      for (let x = 1; x <= 50; x++) {
        makeTest(1.1, 1.5, 1);
      }
    });

    it('1, 1.4, 2)', function () {
      for (let x = 1; x <= 50; x++) {
        makeTest(1, 1.4, 2);
      }
    });
  });

  describe('value check  --precision', function () {});

  describe('null check', function () {
    it('1.1, 1.4, 0', function () {
      for (let x = 1; x <= 50; x++) {
        assert.equal(randomizeInRange(1.1, 1.4, 0), null);
      }
    });

    it('-1, 2.4, 2)', function () {
      for (let x = 1; x <= 50; x++) {
        assert.equal(randomizeInRange(-1, 2.4, 2), null);
      }
    });

    it('1.1, 1.4, 0.5)', function () {
      for (let x = 1; x <= 50; x++) {
        assert.equal(randomizeInRange(1.1, 1.4, 0.5), null);
      }
    });
  });
});


