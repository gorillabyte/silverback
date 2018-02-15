import chai = require('chai');
import { Position, PixiDisplay, PixiGroup } from '..';
import { PIXI } from '../../systems/test/Pixi.stub';

const expect = chai.expect;

describe('Components', () => {

    before(function () {
        this.jsdom = require('jsdom-global')();
    });

    after(function () {
        this.jsdom();
    });

    describe('- PixiDisplay', () => {
        it('should create a PixiDisplay instance with path as parameter', () => {
            window.PIXI = PIXI;
            const display = new PixiDisplay('10 10');
            expect(display.sprite).to.be.instanceOf(PIXI.Sprite);
        });
    });

    describe('- PixiGroup', () => {
        it('should create a PixiGroup instance with path as parameter', () => {
            window.PIXI = PIXI;
            const display = new PixiGroup();
            expect(display.group).to.be.instanceOf(PIXI.Container);
        });
    });

    describe('- Position', () => {
        it('should create a Position component instance with pos parameter', () => {
            const pos = new Position('10 10');
            expect(pos.pos.x).to.deep.equal(10);
            expect(pos.pos.y).to.deep.equal(10);
            expect(pos.rot).to.deep.equal(0);
        });

        it('should create a Position component instance with all parameter', () => {
            const pos = new Position('10 10 10');
            expect(pos.pos.x).to.deep.equal(10);
            expect(pos.pos.y).to.deep.equal(10);
            expect(pos.rot).to.deep.equal(10);
        });
    });
});
