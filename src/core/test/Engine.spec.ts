import { Engine } from '../Engine';
import { Entity } from '../Entity';
import { FamilyMock } from './Family.stub';
import { NodeMock, NodeMock2 } from './Node.stub';
import { Vec2D, Position } from './Component.stub';
import { System } from '../System';
import { SystemMock } from './System.stub';
import { Scene } from '../Scene';
import chai = require('chai');

const expect = chai.expect;

describe('Engine', () => {
    let engine: Engine;

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
            let entity1: Entity = new Entity();
            engine.addEntity(entity1);
            let entity2: Entity = new Entity();
            engine.addEntity(entity2);
            expect(engine.entities.length).to.deep.equal(2);
            expect(engine.entities).to.include(entity1);
            expect(engine.entities).to.include(entity2);
        });

        it('should return the correct entity by name', () => {
            let entity1: Entity = new Entity();
            entity1.name = 'otherEntity';
            engine.addEntity(entity1);
            let entity2: Entity = new Entity();
            entity2.name = 'myEntity';
            engine.addEntity(entity2);
            expect(engine.getEntityByName('myEntity')).to.deep.equal(entity2);
        });

        it('should return null, if getEntitiyByName found not result', () => {
            let entity1: Entity = new Entity();
            entity1.name = 'otherEntity';
            engine.addEntity(entity1);
            let entity2: Entity = new Entity();
            entity2.name = 'myEntity';
            engine.addEntity(entity2);
            expect(engine.getEntityByName('wrongName')).to.be.null;
        });

        it('should add an entity and checks with all families', () => {
            engine.getNodeList(NodeMock);
            engine.getNodeList(NodeMock2);
            let entity: Entity = new Entity();
            engine.addEntity(entity);
            expect(FamilyMock.instances[0].newEntityCalls).to.deep.equal(1);
            expect(FamilyMock.instances[1].newEntityCalls).to.deep.equal(1);
        });

        it('should remove an entity and checks with all families', () => {
            engine.getNodeList(NodeMock);
            engine.getNodeList(NodeMock2);
            let entity: Entity = new Entity();
            engine.addEntity(entity);
            engine.removeEntity(entity);
            expect(FamilyMock.instances[0].removeEntityCalls).to.deep.equal(1);
            expect(FamilyMock.instances[1].removeEntityCalls).to.deep.equal(1);
        });

        it('should remove all entities with all families', () => {
            engine.getNodeList(NodeMock);
            engine.getNodeList(NodeMock2);
            let entity: Entity = new Entity();
            let entity2: Entity = new Entity();
            engine.addEntity(entity);
            engine.addEntity(entity2);
            engine.removeAllEntities();
            expect(FamilyMock.instances[0].removeEntityCalls).to.deep.equal(1);
            expect(FamilyMock.instances[1].removeEntityCalls).to.deep.equal(1);
        });

        it('should select a NodeList, if an appropriate NodeList was already created', () => {
            let nodeList = engine.getNodeList(NodeMock);
            let nodeList2 = engine.getNodeList(NodeMock);
            expect(nodeList).to.deep.equal(nodeList2);
        });

        it('should add a component and checks with all families', () => {
            engine.getNodeList(NodeMock);
            engine.getNodeList(NodeMock2);
            let entity: Entity = new Entity();
            engine.addEntity(entity);
            entity.addComponent(new Vec2D(0, 0));
            expect(FamilyMock.instances[0].componentAddedCalls).to.deep.equal(1);
            expect(FamilyMock.instances[1].componentAddedCalls).to.deep.equal(1);
        });

        it('should remove a component and checks with all families', () => {
            engine.getNodeList(NodeMock);
            engine.getNodeList(NodeMock2);
            let entity: Entity = new Entity();
            engine.addEntity(entity);
            entity.addComponent(new Vec2D(0, 0));
            entity.removeComponent('Vec2D');
            expect(FamilyMock.instances[0].componentRemovedCalls).to.deep.equal(1);
            expect(FamilyMock.instances[1].componentRemovedCalls).to.deep.equal(1);
        });

        it('should get the nodeList and creates the family', () => {
            engine.getNodeList(NodeMock);
            expect(FamilyMock.instances.length).to.deep.equal(1);
        });

        it('should get the nodeList and checks all entities', () => {
            engine.addEntity(new Entity());
            engine.addEntity(new Entity());
            engine.getNodeList(NodeMock);
            expect(FamilyMock.instances[0].newEntityCalls).to.deep.equal(2);
        });

        it('should release the nodeList and calls cleanUp', () => {
            engine.getNodeList(NodeMock);
            engine.releaseNodeList(NodeMock);
            expect(FamilyMock.instances[0].cleanUpCalls).to.deep.equal(1);
        });

        it('should throw an error, if the releaseNodeList fails', () => {
            engine.getNodeList(NodeMock);
            expect(() => {
                engine.releaseNodeList(NodeMock2);
            }).to.throw('The given nodeClass was not found and can not be released.');
        });

        it('should obtain an entity by name', () => {
            let entity: Entity = new Entity('anything');
            engine.addEntity(entity);
            let other: Entity = engine.getEntityByName('anything');
            expect(other).to.deep.equal(entity);
        });

        it('should obtain an entity by name after renaming', () => {
            let entity: Entity = new Entity('anything');
            engine.addEntity(entity);
            entity.name = 'otherName';
            let other: Entity = engine.getEntityByName('otherName');
            expect(other).to.deep.equal(entity);
        });

        it('should return null, if the entity cannot be obtained by old name after renaming', () => {
            let entity: Entity = new Entity('anything');
            engine.addEntity(entity);
            entity.name = 'otherName';
            let other: Entity = engine.getEntityByName('anything');
            expect(other).to.be.null;
        });

        it('should return an error, if a new entity use a name which is already in use', () => {
            let entity: Entity = new Entity('anything');
            let entity2: Entity = new Entity('anything');
            engine.addEntity(entity);
            expect(() => {
                engine.addEntity(entity2);
            }).to.throw('The entity name anything is already in use by another entity.');
        });

        it('should return an error, if the entity name changes and it was not found in the entity list', () => {
            let entity: Entity = new Entity('anything');
            engine.addEntity(entity);
            expect(() => {
                entity.nameChanged.dispatch(this, 'noResultFound');
            }).to.throw('The given name was not found in the entity list.');
        });

        it('should parse a component, create the class and add it to the entity', () => {
            const writtenComponenet = JSON.parse('{ "type": "Position", "props": { "x": "0", "y": "0" } }');
            engine.getNodeList(NodeMock2);
            let entity: Entity = new Entity();
            engine.addEntity(entity);
            let allComponent = new Map([['Position', Position]]);
            let testClass: any = allComponent.get(writtenComponenet.type);
            let testProps = writtenComponenet.props;
            let test = new testClass();
            for (let pro in testProps) {
                if (testProps.hasOwnProperty(pro)) {
                    test[pro] = testProps[pro];
                }
            }
            entity.addComponent(test);
            expect(FamilyMock.instances[0].componentAddedCalls).to.deep.equal(1);
        });
    });

    describe('- System', () => {
        it('should add a system correctly to the engine', () => {
            let system: System = new SystemMock();
            engine.addSystem(system, 0);
            expect(engine.systems.length).to.deep.equal(1);
        });

        it('should remove a system correctly from the engine', () => {
            let system: System = new SystemMock();
            let system2: System = new SystemMock();
            engine.addSystem(system, 0);
            engine.addSystem(system2, 1);
            engine.removeSystem(system);
            expect(engine.systems.length).to.deep.equal(1);
        });

        it('should remove all system from the engine', () => {
            let system: System = new SystemMock();
            let system2: System = new SystemMock();
            engine.addSystem(system, 0);
            engine.addSystem(system2, 1);
            engine.removeAllSystems();
            expect(engine.systems.length).to.deep.equal(0);
        });

        it('should get a system by its type from the engine', () => {
            let system: SystemMock = new SystemMock();
            engine.addSystem(system, 1);
            expect(engine.getSystem(SystemMock)).to.deep.equal(system);
        });

        it('should call update on all systems while the update loop', () => {
            let system: SystemMock = new SystemMock();
            engine.addSystem(system, 0);
            engine.update(10);
            expect(system.updateCalls).to.deep.equal(1);
        });
    });

    describe('- Scene', () => {
        it('should add a scene correctly to the engine', () => {
            let scene: Scene = new Scene();
            engine.addScene(scene);
            expect(engine.scenes.length).to.deep.equal(1);
        });

        it('should remove a scene correctly to the engine', () => {
            let scene = new Scene();
            let scene2 = new Scene();
            engine.addScene(scene);
            engine.addScene(scene2);
            engine.removeScene(scene2);
            expect(engine.scenes.length).to.deep.equal(1);
        });

        it('should remove all scenes from the engine', () => {
            let scene = new Scene();
            let scene2 = new Scene();
            engine.addScene(scene);
            engine.addScene(scene2);
            engine.removeAllScenes();
            expect(engine.scenes.length).to.deep.equal(0);
        });

        it('should get a scene by its type from the engine', () => {
            let scene: Scene = new Scene();
            engine.addScene(scene);
            expect(engine.getScene(Scene)).to.deep.equal(scene);
        });

        it('should return the correct scene by name', () => {
            let scene: Scene = new Scene();
            scene.name = 'someScene';
            engine.addScene(scene);
            let scene2: Scene = new Scene();
            scene2.name = 'otherScene';
            engine.addScene(scene2);
            expect(engine.getSceneByName('otherScene')).to.deep.equal(scene2);
        });

        it('should return null, if getSceneByName found not result', () => {
            let scene: Scene = new Scene();
            scene.name = 'someScene';
            engine.addScene(scene);
            expect(engine.getSceneByName('wrongName')).to.be.null;
        });

        it('should obtain an scene by name after renaming', () => {
            let scene: Scene = new Scene();
            scene.name = 'someScene';
            engine.addScene(scene);
            scene.name = 'newNameScene';
            let other: Scene = engine.getSceneByName('newNameScene');
            expect(other).to.deep.equal(scene);
        });

        it('should return an error, if the scene name changes and it was not found in the scene list', () => {
            let scene: Scene = new Scene();
            scene.name = 'someScene';
            engine.addScene(scene);
            expect(() => {
                scene.nameChanged.dispatch(this, 'noResultFound');
            }).to.throw('The given name was not found in the scene list.');
        });
    });

    describe('- Update', () => {
        it('should call update correctly and dispatch the signal when completed', () => {
            let updateCompleteCall = 0;
            engine.updateComplete.add(() => {
                updateCompleteCall++;
            }, this);
            engine.update(10);
            expect(updateCompleteCall).to.deep.equal(1);
        });
    });
});
