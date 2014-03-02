/* global returnTrue */
describe('Test Suite', function () {
    'use strict';

    it('Should return true', function () {
        expect(returnTrue()).to.be.true;
    });

    it('Should NOT return false', function () {
        expect(returnTrue()).not.to.be.false;
    });

});