import chai = require('chai');
import { Engine } from '../Engine';
import { NodeMock, NodeMock2, NewNodeMock } from './Node.stub';
import { Vec2D, Matrix } from './Component.stub';
import { Entity } from '../Entity';

const expect = chai.expect;

describe('EngineFamilyIntegration', () => {
    let engine: Engine;

    beforeEach(() => {
        engine = new Engine();
    });

    afterEach(() => {
        engine = null;
    });

    describe('- FamilyNode', () => {
        it('should be initially empty', () => {
            let nodes = engine.getNodeList(NewNodeMock);
            expect(nodes.size).to.be.equal(0);
        });

        it('should contain the entity properties', () => {
            const entity: Entity = new Entity();
            const point: Vec2D = new Vec2D(10, 10);
            const matrix: Matrix = new Matrix();
            entity.addComponent(point);
            entity.addComponent(matrix);
            const nodes = engine.getNodeList(NewNodeMock);
            engine.addEntity(entity);
            for (let item of nodes) {
                expect(item.point).to.be.equal(point);
                expect(item.matrix).to.be.equal(matrix);
            }
        });

        it('should add a component and only the family with the component should be selected', () => {
            let entity: Entity = new Entity();
            engine.addEntity(entity);
            entity.addComponent(new Vec2D(0, 0));
            entity.addComponent(new Matrix());
            let nodeList1 = engine.getNodeList(NodeMock);
            let nodeList2 = engine.getNodeList(NodeMock2);
            expect(nodeList1.size).to.deep.equal(1);
            expect(nodeList2.size).to.deep.equal(0);
        });

        it('should correctly add entity to family, when accessing the family first', () => {
            let entity: Entity = new Entity();
            entity.addComponent(new Vec2D(0, 0));
            entity.addComponent(new Matrix());
            let nodes = engine.getNodeList(NewNodeMock);
            engine.addEntity(entity);
            for (let item of nodes) {
                expect(item.entity).to.be.deep.equal(entity);
            }
        });

        it('should correctly add entity to family, when accessing the family second', () => {
            let entity: Entity = new Entity();
            entity.addComponent(new Vec2D(0, 0));
            entity.addComponent(new Matrix());
            engine.addEntity(entity);
            let nodes = engine.getNodeList(NewNodeMock);
            for (let item of nodes) {
                expect(item.entity).to.be.deep.equal(entity);
            }
        });

        it('should correctly add entity to family, when components added', () => {
            let entity: Entity = new Entity();
            engine.addEntity(entity);
            let nodes = engine.getNodeList(NewNodeMock);
            entity.addComponent(new Vec2D(0, 0));
            entity.addComponent(new Matrix());
            for (let item of nodes) {
                expect(item.entity).to.be.deep.equal(entity);
            }
        });

        it('should not add incorrect entity to a family, when accessing the family first', () => {
            let entity: Entity = new Entity();
            let nodes = engine.getNodeList(NewNodeMock);
            engine.addEntity(entity);
            for (let item of nodes) {
                expect(item).to.be.null;
            }
        });

        it('should removed entity from family, when component removed and family already accessed', () => {
            let entity: Entity = new Entity();
            entity.addComponent(new Vec2D(0, 0));
            entity.addComponent(new Matrix());
            engine.addEntity(entity);
            let nodes = engine.getNodeList(NewNodeMock);
            entity.removeComponent('Vec2D');
            for (let item of nodes) {
                expect(item).to.be.null;
            }
        });

        it('should removed entity from family, when component removed and family not already accessed', () => {
            let entity: Entity = new Entity();
            entity.addComponent(new Vec2D(0, 0));
            entity.addComponent(new Matrix());
            engine.addEntity(entity);
            entity.removeComponent('Vec2D');
            let nodes = engine.getNodeList(NewNodeMock);
            for (let item of nodes) {
                expect(item).to.be.null;
            }
        });

        it('should removed entity from family, when entity removed from engine and family already accessed', () => {
            let entity: Entity = new Entity();
            entity.addComponent(new Vec2D(0, 0));
            entity.addComponent(new Matrix());
            engine.addEntity(entity);
            let nodes = engine.getNodeList(NewNodeMock);
            engine.removeEntity(entity);
            for (let item of nodes) {
                expect(item).to.be.null;
            }
        });

        it('should removed entity from family, when entity removed from engine and family not already accessed', () => {
            let entity: Entity = new Entity();
            entity.addComponent(new Vec2D(0, 0));
            entity.addComponent(new Matrix());
            engine.addEntity(entity);
            engine.removeEntity(entity);
            let nodes = engine.getNodeList(NewNodeMock);
            for (let item of nodes) {
                expect(item).to.be.null;
            }
        });

        it('should only contain matching entities', () => {
            let entities = [];
            for (let i = 0; i < 5; ++i) {
                let entity: Entity = new Entity();
                entity.addComponent(new Vec2D(0, 0));
                entity.addComponent(new Matrix());
                entities.push(entity);
                engine.addEntity(entity);
            }
            let nodes = engine.getNodeList(NewNodeMock);
            for (let item of nodes) {
                expect(entities).to.include(item.entity);
            }
        });

        it('should only contain matching entities after clearing', () => {
            let entities = [];
            for (let i = 0; i < 5; ++i) {
                let entity: Entity = new Entity();
                entity.addComponent(new Vec2D(0, 0));
                entity.addComponent(new Matrix());
                entities.push(entity);
                engine.addEntity(entity);
            }
            let nodes = engine.getNodeList(NewNodeMock);
            for (let item of nodes) {
                let index = entities.indexOf(item.entity);
                entities.splice(index, 1);
            }
            expect(entities.length).to.be.equal(0);
        });

        it('should release family empty nodeList', () => {
            let entity: Entity = new Entity();
            entity.addComponent(new Vec2D(0, 0));
            entity.addComponent(new Matrix());
            engine.addEntity(entity);
            let nodes = engine.getNodeList(NewNodeMock);
            engine.releaseNodeList(NewNodeMock);
            for (let item of nodes) {
                expect(item).to.be.null;
            }
        });

        it('should release family sets node to null', () => {
            let entities = [];
            for (let i = 0; i < 5; ++i) {
                let entity: Entity = new Entity();
                entity.addComponent(new Vec2D(0, 0));
                entity.addComponent(new Matrix());
                entities.push(entity);
                engine.addEntity(entity);
            }

            let nodes = engine.getNodeList(NewNodeMock);
            engine.releaseNodeList(NewNodeMock);
            expect(nodes.size).to.be.equal(0);
        });

        it('should remove all entities by calling the method', () => {
            let entity: Entity = new Entity();
            entity.addComponent(new Vec2D(0, 0));
            entity.addComponent(new Matrix());
            engine.addEntity(entity);
            entity = new Entity();
            entity.addComponent(new Vec2D(0, 0));
            entity.addComponent(new Matrix());
            engine.addEntity(entity);
            engine.removeAllEntities();
            let nodes = engine.getNodeList(NewNodeMock);
            for (let item of nodes) {
                expect(item).to.be.null;
            }
        });
    });
});
