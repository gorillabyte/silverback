import chai = require('chai');
import { Vec2D } from '../Vec2D';

const expect = chai.expect;

describe('Utils', () => {

    describe('- Vec2D', () => {
        it('should create a new Vec2D instance', () => {
            const vec = new Vec2D(10, 10);
            expect(vec.x).to.deep.equal(10);
            expect(vec.y).to.deep.equal(10);
            expect(vec.l).to.deep.equal(14.142135623730951);
        });

        it('should create a new Vec2D instance without parameters', () => {
            const vec = new Vec2D();
            expect(vec.x).to.deep.equal(0);
            expect(vec.y).to.deep.equal(0);
            expect(vec.l).to.deep.equal(0);
        });

        it('should set the length of a new Vec2D vector', () => {
            const vec = new Vec2D(10, 10);
            vec.setLength(10);
            expect(vec.x).to.deep.equal(7.071067811865475);
            expect(vec.y).to.deep.equal(7.071067811865475);
            expect(vec.l).to.deep.equal(10);
        });

        it('should get the squared length of a new Vec2D vector', () => {
            const vec = new Vec2D(10, 10);
            expect(vec.getLengthSq()).to.deep.equal(200);
        });

        it('should rotate a new Vec2D vector by a given value', () => {
            const vec = new Vec2D(10, 10);
            const rotVec = vec.rotateBy(5);
            expect(rotVec.x).to.deep.equal(12.425864601263648);
            expect(rotVec.y).to.deep.equal(-6.752620891999122);
            expect(rotVec.l).to.deep.equal(14.142135623730951);
        });

        it('should make a copy of a given Vec2D instance', () => {
            const vec = new Vec2D(10, 10);
            const vec2 = vec.copy(vec);
            expect(vec).to.deep.equal(vec2);
            expect(vec2.x).to.deep.equal(10);
            expect(vec2.y).to.deep.equal(10);
        });

        it('should make a clone of a given Vec2D instance', () => {
            const vec = new Vec2D(10, 10);
            const vec2 = vec.clone();
            expect(vec).to.deep.equal(vec2);
            expect(vec2.x).to.deep.equal(10);
            expect(vec2.y).to.deep.equal(10);
        });

        it('should reset given Vec2D to new values', () => {
            const vec = new Vec2D(10, 10);
            vec.reset(100, 100);
            expect(vec.x).to.deep.equal(100);
            expect(vec.y).to.deep.equal(100);
        });

        it('should normalize a given Vec2D vector', () => {
            const vec = new Vec2D(10, 10);
            vec.normalize();
            expect(vec.x).to.deep.equal(0.7071067811865475);
            expect(vec.y).to.deep.equal(0.7071067811865475);
        });

        it('should compare two given Vec2D vectors', () => {
            const vec = new Vec2D(10, 10);
            const equal = vec.equals(new Vec2D(10, 10));
            expect(equal).to.be.true;
        });

        it('should return the angle of a Vec2D vectors', () => {
            const vec = new Vec2D(10, 10);
            const angle = vec.getAngle();
            expect(angle).to.deep.equal(0.7853981633974483);
        });

        it('should set the angle of a Vec2D vectors', () => {
            const vec = new Vec2D(10, 10);
            const newVec = vec.setAngle(10);
            expect(newVec.x).to.deep.equal(-0.6590052378957344);
            expect(newVec.y).to.deep.equal(-0.4272731813419506);
        });

        it('should add two vectors together', () => {
            const vec = new Vec2D(10, 10);
            const vec2 = vec.add(new Vec2D(10, 10));
            expect(vec2.x).to.deep.equal(20);
            expect(vec2.y).to.deep.equal(20);
        });

        it('should subtract two vectors together', () => {
            const vec = new Vec2D(10, 10);
            const vec2 = vec.subtract(new Vec2D(5, 5));
            expect(vec2.x).to.deep.equal(5);
            expect(vec2.y).to.deep.equal(5);
        });

        it('should add scalar to a vector', () => {
            const vec = new Vec2D(10, 10);
            const vec2 = vec.addScalar(10);
            expect(vec2.x).to.deep.equal(20);
            expect(vec2.y).to.deep.equal(20);
        });

        it('should subtract scalar to a vector', () => {
            const vec = new Vec2D(10, 10);
            const vec2 = vec.subtractScalar(5);
            expect(vec2.x).to.deep.equal(5);
            expect(vec2.y).to.deep.equal(5);
        });

        it('should scale a vector', () => {
            const vec = new Vec2D(10, 10);
            const vec2 = vec.scale(new Vec2D(10, 10));
            expect(vec2.x).to.deep.equal(100);
            expect(vec2.y).to.deep.equal(100);
        });

        it('should divide two vectors together', () => {
            const vec = new Vec2D(10, 10);
            const vec2 = vec.divide(new Vec2D(2, 2));
            expect(vec2.x).to.deep.equal(5);
            expect(vec2.y).to.deep.equal(5);
        });

        it('should multiply two vectors together', () => {
            const vec = new Vec2D(10, 10);
            const vec2 = vec.multiply(new Vec2D(5, 5));
            expect(vec2.x).to.deep.equal(50);
            expect(vec2.y).to.deep.equal(50);
        });

        it('should divide scalar to a vector', () => {
            const vec = new Vec2D(10, 10);
            const vec2 = vec.divideScalar(5);
            expect(vec2.x).to.deep.equal(2);
            expect(vec2.y).to.deep.equal(2);
        });

        it('should multiply scalar to a vector', () => {
            const vec = new Vec2D(10, 10);
            const vec2 = vec.multiplyScalar(5);
            expect(vec2.x).to.deep.equal(50);
            expect(vec2.y).to.deep.equal(50);
        });

        it('should calculate the perpendicular vector', () => {
            const vec = new Vec2D(10, 10);
            const vec2 = vec.perp();
            expect(vec2.y).to.deep.equal(-10);
        });

        it('should negate a vector', () => {
            const vec = new Vec2D(10, 10);
            const vec2 = vec.negate();
            expect(vec2.x).to.deep.equal(-10);
            expect(vec2.y).to.deep.equal(-10);
        });

        it('should clamp a vector', () => {
            const vec = new Vec2D(10, 10);
            const vec2 = vec.clamp(5, 100);
            expect(vec2.x).to.deep.equal(10);
            expect(vec2.y).to.deep.equal(10);
        });

        it('should calculate a vector dot product', () => {
            const vec = new Vec2D(10, 10);
            const product = vec.dotProduct(new Vec2D(5, 5));
            expect(product).to.deep.equal(100);
        });

        it('should calculate the cross product of this and another vector', () => {
            const vec = new Vec2D(10, 10);
            const product = vec.crossProd(new Vec2D(5, 5));
            expect(product).to.deep.equal(0);
        });

        it('should truncate a vector', () => {
            const vec = new Vec2D(10, 10);
            const vec2 = vec.truncate(100);
            expect(vec2.x).to.deep.equal(70.71067811865474);
            expect(vec2.y).to.deep.equal(70.71067811865474);
        });

        it('should calculate the angle to another vector', () => {
            const vec = new Vec2D(10, 10);
            const angle = vec.angleTo(new Vec2D(1, 1));
            expect(angle).to.deep.equal(0.7853981633974483);
        });

        it('should calculate the distance to another vector', () => {
            const vec = new Vec2D(10, 10);
            const distance = vec.distanceTo(new Vec2D(1, 1));
            expect(distance).to.deep.equal(12.727922061357855);
        });

        it('should calculate the distance to squared to another vector', () => {
            const vec = new Vec2D(10, 10);
            const distance = vec.distanceToSquared(new Vec2D(1, 1));
            expect(distance).to.deep.equal(162);
        });

        it('should calculate the lerp of a vector', () => {
            const vec = new Vec2D(10, 10);
            const vec2 = vec.lerp(new Vec2D(1, 1), 0.1);
            expect(vec2.x).to.deep.equal(9.1);
            expect(vec2.y).to.deep.equal(9.1);
        });
    });
});
