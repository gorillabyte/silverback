import chai = require('chai');
import { Position } from '../components';

const expect = chai.expect;



describe('Components', () => {

    describe('- PixiDisplay', () => {
        it('should create a PixiDisplay instance with path as parameter', () => {
            /* need a PIXI object */
        });
    });

    describe('- Position', () => {
        it('should create a Position component instance with pos parameter', () => {
            const pos = new Position(10, 10);
            expect(pos.pos.x).to.deep.equal(10);
            expect(pos.pos.y).to.deep.equal(10);
            expect(pos.rot).to.deep.equal(0);
        });

        it('should create a Position component instance with all parameter', () => {
            const pos = new Position(10, 10, 10);
            expect(pos.pos.x).to.deep.equal(10);
            expect(pos.pos.y).to.deep.equal(10);
            expect(pos.rot).to.deep.equal(10);
        });
    });
});
