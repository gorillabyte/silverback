import chai = require('chai');
import { PixiRenderSystem } from '../PixiRenderSystem';
import { PIXI } from './Pixi.stub';
import { Engine, Entity } from '../../core';
import { Position, PixiDisplay, PixiGroup } from '../../core/test/Component.stub';

const expect = chai.expect;

describe('PixiRenderSystem', () => {

    it('should create a new PixiRenderSystem instance', () => {
        const renderer = PIXI.renderer;
        const stage = new PIXI.Container();
        const system = new PixiRenderSystem(renderer as any, stage as any);
        expect(system).to.be.not.undefined;
    });

    it('should throw and error if an arguments is missing', () => {
        const renderer = PIXI.renderer;
        const stage = new PIXI.Container();
        expect(() => {
            const system = new PixiRenderSystem(renderer as any, undefined);
            const system2 = new PixiRenderSystem(undefined, stage as any);
        }).to.throw('PixiRenderSystem - Missing argument');
    });

    it('should throw and error if the arguments do not have the correct type', () => {
        const renderer = PIXI.renderer;
        const stage = new PIXI.Container();
        expect(() => {
            const system = new PixiRenderSystem(renderer as any, {} as any);
            const system2 = new PixiRenderSystem({} as any, stage as any);
        }).to.throw('PixiRenderSystem - Wrong argument type');
    });

    it('should add the system correct to the engine', () => {
        const engine = new Engine();
        const renderer = PIXI.renderer;
        const stage = new PIXI.Container();
        const system = new PixiRenderSystem(renderer as any, stage as any);
        engine.addSystem(system, 0);
        expect(engine.getSystem(PixiRenderSystem)).to.deep.equal(system);
    });

    it('should be false before update', () => {
        const engine = new Engine();
        const renderer = PIXI.renderer;
        const stage = new PIXI.Container();
        const system = new PixiRenderSystem(renderer as any, stage as any);
        engine.addSystem(system, 0);
        expect(engine.updating).to.be.false;
    });

    it('should add the correct node components to the system', () => {
        const engine = new Engine();
        const renderer = PIXI.renderer;
        const stage = new PIXI.Container();
        const system = new PixiRenderSystem(renderer as any, stage as any);
        let playerEntity = new Entity('playerEntity')
            .addComponent(new Position('100 100 0'))
            .addComponent(new PixiDisplay('assets/img/bunny.png'))
            .addComponent(new PixiGroup());
        engine.addEntity(playerEntity);
        engine.addSystem(system, 1);
        expect(engine.update(10)).to.not.throw;
    });
    it('should remove the system corret from the engine', () => {
        const engine = new Engine();
        const renderer = PIXI.renderer;
        const stage = new PIXI.Container();
        const system = new PixiRenderSystem(renderer as any, stage as any);
        engine.addSystem(system, 1);
        engine.removeSystem(system);
        expect(engine.getSystem(system)).to.be.null;
    });

    it('should add the correct node components to the system', () => {
        const engine = new Engine();
        const renderer = PIXI.renderer;
        const stage = new PIXI.Container();
        const system = new PixiRenderSystem(renderer as any, stage as any);
        let playerEntity = new Entity('playerEntity')
            .addComponent(new Position('100 100 0'))
            .addComponent(new PixiDisplay('assets/img/bunny.png'))
            .addComponent(new PixiGroup());
        engine.addEntity(playerEntity);
        engine.addSystem(system, 1);
        expect(engine.update(10)).to.not.throw;
    });
});
