import chai = require('chai');
import { arrayContains } from '../Array';

const expect = chai.expect;

describe('Utils - Array', () => {
    it('arrayContains should return true, if the element was found in an array', () => {
        const obj = { name: 'test'};
        const test = [obj];
        expect(arrayContains(test, obj)).to.deep.equal(true);
    });

    it('arrayContains should return false, if the element was not found in an array', () => {
        const test = [{ name: 'test'}];
        expect(arrayContains(test, { name: 'test'})).to.deep.equal(false);
    });
});
