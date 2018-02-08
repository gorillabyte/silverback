import chai = require('chai');
import { Scene } from '../Scene';
import { Entity } from '../Entity';

const expect = chai.expect;

describe('Scene unit test', () => {
    let scene: Scene;

    describe('- Scene', () => {
        it('should have a name by default', () => {
            scene = new Scene();
            expect(scene.name.length).to.be.greaterThan(0);
        });

        it('should store and return a given entity name', () => {
            let name = 'anything';
            scene = new Scene(name);
            expect(scene.name).to.deep.equal(name);
        });

        it('should change the entity name correctly', () => {
            scene = new Scene('anything');
            scene.name = 'newOne';
            expect(scene.name).to.deep.equal('newOne');
        });

        it('should dispatch the changed signal after the name has changed', () => {
            let signalSend = false;
            scene = new Scene('anything');
            scene.nameChanged.add((signalEntity: Scene, oldName: string) => {
                expect(signalEntity).to.deep.equal(scene);
                expect(scene.name).to.deep.equal('newOne');
                expect(oldName).to.deep.equal('anything');
                signalSend = true;
            });
            scene.name = 'newOne';
        });

        it('should correctly add an entity to the scene', () => {
            scene = new Scene('anything');
            let entity = new Entity();
            scene.addEntity(entity);
            expect(scene.getAllEntities().length).to.deep.equal(1);
            expect(scene.getAllEntities()[0]).to.deep.equal(entity);
        });

        it('should correctly remove an entity with reference from the scene', () => {
            scene = new Scene('anything');
            let entity = new Entity();
            scene.addEntity(entity);
            scene.removeEntity(entity);
            expect(scene.getAllEntities().length).to.deep.equal(0);
        });

        it('should correctly remove an entity with index from the scene', () => {
            scene = new Scene('anything');
            let entity = new Entity();
            scene.addEntity(entity);
            scene.removeEntity(entity);
            expect(scene.getAllEntities().length).to.deep.equal(0);
        });

        it('should return true, if a given entity name was found in the scene', () => {
            scene = new Scene();
            let entity = new Entity();
            scene.addEntity(entity);
            expect(scene.hasEntityWithName(entity.name)).to.be.true;
        });

        it('should return false, if a given entity name was not found in the scene', () => {
            scene = new Scene();
            let entity = new Entity();
            scene.addEntity(entity);
            expect(scene.hasEntityWithName('anyName')).to.be.false;
        });

        it('should return an entity reference with the a given entity name from the scene', () => {
            scene = new Scene();
            let entity = new Entity('newEntity');
            scene.addEntity(entity);
            expect(scene.getEntityWithName('newEntity')).to.deep.equal(entity);
        });
    });
});
