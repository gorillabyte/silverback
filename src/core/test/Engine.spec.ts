/// <reference path="../../../typings/tsd.d.ts" />

import {Engine} from '../Engine';
import {Entity} from '../Entity';
import {FamilyMock} from './FamilyMock';
import {NodeMock, NodeMock2, Vec2D} from './NodeMock';
import {System} from '../System';
import {SystemMock} from './SystemMock';

describe('Engine', () => {
    var engine:Engine;

    beforeEach(() => {
        engine = new Engine();
        engine.familyClass = FamilyMock;
        FamilyMock.reset();
    });

    afterEach(() => {
        engine = null;
    });
    describe('- Entity', () => {

        it('should return all entities added to the engine', () => {
            var entity1:Entity = new Entity();
            engine.addEntity(entity1);
            var entity2:Entity = new Entity();
            engine.addEntity(entity2);
            expect(engine.entities.length).toBe(2);
            expect(engine.entities).toContain(entity1, entity2);
        });

        it('should return the correct entity by name', () => {
            var entity1:Entity = new Entity();
            entity1.name = 'otherEntity';
            engine.addEntity(entity1);
            var entity2:Entity = new Entity();
            entity2.name = 'myEntity';
            engine.addEntity(entity2);
            expect(engine.getEntityByName('myEntity')).toEqual(entity2);
        });

        it('should return null, if getEntitiyByName found not result', () => {
            var entity1:Entity = new Entity();
            entity1.name = 'otherEntity';
            engine.addEntity(entity1);
            var entity2:Entity = new Entity();
            entity2.name = 'myEntity';
            engine.addEntity(entity2);
            expect(engine.getEntityByName('wrongName')).toBeNull();
        });

        it('should add an entity and checks with all families', () => {
            engine.getNodeList(NodeMock);
            engine.getNodeList(NodeMock2);
            var entity:Entity = new Entity();
            engine.addEntity(entity);
            expect(FamilyMock.instances[0].newEntityCalls).toEqual(1);
            expect(FamilyMock.instances[1].newEntityCalls).toEqual(1);
        });

        it('should remove an entity and checks with all families', () => {
            engine.getNodeList(NodeMock);
            engine.getNodeList(NodeMock2);
            var entity:Entity = new Entity();
            engine.addEntity(entity);
            engine.removeEntity(entity);
            expect(FamilyMock.instances[0].removeEntityCalls).toEqual(1);
            expect(FamilyMock.instances[1].removeEntityCalls).toEqual(1);
        });

        it('should remove all entities with all families', () => {
            engine.getNodeList(NodeMock);
            engine.getNodeList(NodeMock2);
            var entity:Entity = new Entity();
            var entity2:Entity = new Entity();
            engine.addEntity(entity);
            engine.addEntity(entity2);
            engine.removeAllEntities();
            expect(FamilyMock.instances[0].removeEntityCalls).toEqual(2);
            expect(FamilyMock.instances[1].removeEntityCalls).toEqual(2);
        });

        it('should select a NodeList, if an appropriate NodeList was already created', () => {
            var nodeList = engine.getNodeList(NodeMock);
            var nodeList2 = engine.getNodeList(NodeMock);
            expect(nodeList).toEqual(nodeList2);
        });

        it('should add a component and checks with all families', () => {
            engine.getNodeList(NodeMock);
            engine.getNodeList(NodeMock2);
            var entity:Entity = new Entity();
            engine.addEntity(entity);
            entity.add(new Vec2D(0, 0));
            expect(FamilyMock.instances[0].componentAddedCalls).toEqual(1);
            expect(FamilyMock.instances[1].componentAddedCalls).toEqual(1);
        });

        it('should remove a component and checks with all families', () => {
            engine.getNodeList(NodeMock);
            engine.getNodeList(NodeMock2);
            var entity:Entity = new Entity();
            engine.addEntity(entity);
            entity.add(new Vec2D(0, 0));
            entity.remove(Vec2D);
            expect(FamilyMock.instances[0].componentRemovedCalls).toEqual(1);
            expect(FamilyMock.instances[1].componentRemovedCalls).toEqual(1);
        });

        it('should get the nodeList and creates the family', () => {
            engine.getNodeList(NodeMock);
            expect(FamilyMock.instances.length).toEqual(1);
        });

        it('should get the nodeList and checks all entities', () => {
            engine.addEntity(new Entity());
            engine.addEntity(new Entity());
            engine.getNodeList(NodeMock);
            expect(FamilyMock.instances[0].newEntityCalls).toEqual(2);
        });

        it('should release the nodeList and calls cleanUp', () => {
            engine.getNodeList(NodeMock);
            engine.releaseNodeList(NodeMock);
            expect(FamilyMock.instances[0].cleanUpCalls).toEqual(1);
        });

        it('should obtain an entity by name', () => {
            var entity:Entity = new Entity('anything');
            engine.addEntity(entity);
            var other:Entity = engine.getEntityByName('anything');
            expect(other).toEqual(entity);
        });

        it('should obtain an entity by name after renaming', () => {
            var entity:Entity = new Entity('anything');
            engine.addEntity(entity);
            entity.name = 'otherName';
            var other:Entity = engine.getEntityByName('otherName');
            expect(other).toEqual(entity);
        });

        it('should return null, if the entity cannot be obtained by old name after renaming', () => {
            var entity:Entity = new Entity('anything');
            engine.addEntity(entity);
            entity.name = 'otherName';
            var other:Entity = engine.getEntityByName('anything');
            expect(other).toBeNull();
        });

        it('should return an error, if a new entity use a name which is already in use', () => {
            var entity:Entity = new Entity('anything');
            var entity2:Entity = new Entity('anything');
            engine.addEntity(entity);
            expect(() => {
                engine.addEntity(entity2);
            }).toThrow(
                new Error('The entity name anything is already in use by another entity.'));
        });
    });

    describe('- System', () => {

        it('should add a system correctly to the engine', () => {
            var system:System = new System();
            engine.addSystem(system, 0);
            expect(engine.systems.length).toEqual(1);
        });

        it('should remove a system correctly from the engine', () => {
            var system:System = new System();
            var system2:System = new System();
            engine.addSystem(system, 0);
            engine.addSystem(system2, 1);
            engine.removeSystem(system);
            expect(engine.systems.length).toEqual(1);
        });

        it('should remove all system from the engine', () => {
            var system:System = new System();
            var system2:System = new System();
            engine.addSystem(system, 0);
            engine.addSystem(system2, 1);
            engine.removeAllSystems();
            expect(engine.systems.length).toEqual(0);
        });

        it('should get a system by its type from the engine', () => {
            var system:SystemMock = new SystemMock();
            engine.addSystem(system, 1);
            expect(engine.getSystem(SystemMock)).toEqual(system);
        });

        it('should call update on all systems while the update loop', () => {
            var system:SystemMock = new SystemMock();
            engine.addSystem(system, 0);
            engine.update(10);
            expect(system.updateCalls).toEqual(1);
        });
    });

    describe('- Update', () => {
        it('should call update correctly and dispatch the signal when completed', () => {
            var updateCompleteCall = 0;
            engine.updateComplete.add(() => { updateCompleteCall++; }, this);
            engine.update(10);
            expect(updateCompleteCall).toEqual(1);
        });
    });
});