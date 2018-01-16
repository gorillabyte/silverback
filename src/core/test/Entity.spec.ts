import chai = require('chai');
import { Entity } from '../Entity';
import { ComponentMock, ComponentMock2, ComponentMockExtended } from './Component.stub';

let expect = chai.expect;

describe('Entity unit test', () => {
    let entity: Entity;

    beforeEach(() => {
        entity = new Entity();
    });

    afterEach(() => {
        entity = null;
    });

    describe('- Entity', () => {

        it('should add returns reference to the entity', () => {
            let component: ComponentMock = new ComponentMock();
            let e: Entity = entity.addComponent(component);
            expect(e).to.deep.equal(entity);
        });

        it('should be able to store and retrieve components', () => {
            let component: ComponentMock = new ComponentMock();
            entity.addComponent(component);
            expect(entity.getComponent('ComponentMock')).to.deep.equal(component);
        });

        it('should be able to store and retrieve multiple components', () => {
            let component: ComponentMock = new ComponentMock();
            entity.addComponent(component);
            let component2: ComponentMock2 = new ComponentMock2();
            entity.addComponent(component2);
            expect(entity.getComponent('ComponentMock')).to.deep.equal(component);
            expect(entity.getComponent('ComponentMock2')).to.deep.equal(component2);
        });

        it('should be able to replace a component', () => {
            let component: ComponentMock = new ComponentMock();
            entity.addComponent(component);
            let component2: ComponentMock = new ComponentMock();
            entity.addComponent(component2);
            expect(entity.getComponent('ComponentMock')).to.deep.equal(component2);
        });

        it('should be able to store base and extendedComponents', () => {
            let component: ComponentMock = new ComponentMock();
            entity.addComponent(component);
            let component2: ComponentMockExtended = new ComponentMockExtended();
            entity.addComponent(component2);
            expect(entity.getComponent('ComponentMock')).to.deep.equal(component);
            expect(entity.getComponent('ComponentMockExtended')).to.deep.equal(component2);
        });

        it('should be able to store extendedComponent as a baseType', () => {
            let component: ComponentMockExtended = new ComponentMockExtended();
            entity.addComponent(component, 'ComponentMock');
            expect(entity.getComponent('ComponentMock')).to.deep.equal(component);
        });

        it('should return null, if no component is not assigned to entity', () => {
            expect(entity.getComponent('ComponentMock')).to.be.undefined;
        });

        it('should retrieve all components', () => {
            let component: ComponentMock = new ComponentMock();
            entity.addComponent(component);
            let component2: ComponentMock2 = new ComponentMock2();
            entity.addComponent(component2);

            let all = entity.getAll();
            expect(all.length).to.equal(2);
            expect(all).to.include(component);
            expect(all).to.include(component2);
        });

        it('hasComponent should return false, if componentType is not present', () => {
            entity.addComponent(new ComponentMock2());
            expect(entity.hasComponent('ComponentMock')).to.be.false;
        });

        it('hasComponent should return true, if componentType is present', () => {
            entity.addComponent(new ComponentMock());
            expect(entity.hasComponent('ComponentMock')).to.be.true;
        });

        it('should be able to remove a component', () => {
            let component: ComponentMock = new ComponentMock();
            entity.addComponent(component);
            entity.removeComponent('ComponentMock');
            expect(entity.hasComponent('ComponentMock')).to.be.false;
        });

        it('should trigger the addedSignal while storing a component', () => {
            let component: ComponentMock = new ComponentMock();
            let signalSend = false;
            entity.componentAdded.add(() => {
                signalSend = true;
            });
            entity.addComponent(component);
            expect(signalSend).to.be.true;
        });

        it('should trigger the removedSignal while removing a component', () => {
            let component: ComponentMock = new ComponentMock();
            let signalSend = false;
            entity.addComponent(component);
            entity.componentRemoved.add(() => {
                signalSend = true;
            });
            entity.removeComponent('ComponentMock');
            expect(signalSend).to.be.true;
        });

        it('the componentAdded signal should contain the correct parameters', () => {
            let component: ComponentMock = new ComponentMock();
            let signalSend = false;

            entity.componentAdded.add((signalEntity: Entity, componentClass) => {
                expect(signalEntity).to.deep.equal(entity);
                expect(componentClass).to.deep.equal('ComponentMock');
                signalSend = true;
            }, 10);
            entity.addComponent(component);
            expect(signalSend).to.be.true;
        });

        it('the componentRemoved signal should contain the correct parameters', () => {
            let component: ComponentMock = new ComponentMock();
            let signalSend = false;

            entity.addComponent(component);
            entity.componentRemoved.add((signalEntity: Entity, componentClass) => {
                expect(signalEntity).to.deep.equal(entity);
                expect(componentClass).to.deep.equal('ComponentMock');
                signalSend = true;
            }, 10);
            entity.removeComponent('ComponentMock');
            expect(signalSend).to.be.true;
        });

        it('should have a name by default', () => {
            entity = new Entity();
            expect(entity.name.length).to.be.greaterThan(0);
        });

        it('should store and return a given entity name', () => {
            let name = 'anything';
            entity = new Entity(name);
            expect(entity.name).to.deep.equal(name);
        });

        it('should change the entity name correctly', () => {
            entity = new Entity('anything');
            entity.name = 'newOne';
            expect(entity.name).to.deep.equal('newOne');
        });

        it('should dispatch the changed signal after the name has changed', () => {
            let signalSend = false;
            entity = new Entity('anything');
            entity.nameChanged.add((signalEntity: Entity, oldName: string) => {
                expect(signalEntity).to.deep.equal(entity);
                expect(entity.name).to.deep.equal('newOne');
                expect(oldName).to.deep.equal('anything');
                signalSend = true;
            });
            entity.name = 'newOne';
        });
    });
});
