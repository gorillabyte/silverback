import chai = require('chai');
import { Engine } from '../Engine';
import { SystemMock, SystemMock2 } from './System.stub';

let expect = chai.expect;

describe('System unit test', () => {
    var engine: Engine;
    var system1: SystemMock;
    var system2: SystemMock;

    beforeEach(() => {
        engine = new Engine();
    });

    afterEach(() => {
        engine = null;
    });

    describe('- System', () => {

        it('should return all the registered systems', () => {
            system1 = new SystemMock();
            engine.addSystem(system1, 1);
            system2 = new SystemMock();
            engine.addSystem(system2, 1);
            expect(engine.systems.length).to.be.equal(2);
            expect(engine.systems).to.include(system1);
            expect(engine.systems).to.include(system2);
        });

        it('should call AddToEngine after adding to the engine', () => {
            system1 = new SystemMock();
            engine.addSystem(system1, 0);
            expect(system1.addToEngineCalls).to.equal(1);
        });

        it('should call RemoveFromEngine after removing from the engine', () => {
            system1 = new SystemMock();
            engine.addSystem(system1, 0);
            engine.removeSystem(system1);
            expect(system1.removeFromEngineCalls).to.equal(1);
        });

        it('engine should call the update on the systems', () => {
            system1 = new SystemMock();
            engine.addSystem(system1, 0);
            engine.update(0.1);
            expect(system1.updateCalls).to.equal(1);
        });

        it('should have a default priority of zero', () => {
            system1 = new SystemMock();
            expect(system1.priority).to.equal(0);
        });

        it('should be able to set a priority when adding to a system', () => {
            system1 = new SystemMock();
            engine.addSystem(system1, 10);
            expect(system1.priority).to.equal(10);
        });

        it('should sort the list with there priority when adding to a new system', () => {
            system1 = new SystemMock();
            engine.addSystem(system1, 10);
            system2 = new SystemMock2();
            engine.addSystem(system2, 5);
            var system3 = new SystemMock();
            engine.addSystem(system3, 1);
            expect(engine.systems[0]).to.deep.equal(system3);
            expect(engine.systems[2]).to.deep.equal(system1);
        });

        it('should sort the list with there priority when removing a system', () => {
            system1 = new SystemMock();
            engine.addSystem(system1, 10);
            system2 = new SystemMock2();
            engine.addSystem(system2, 5);
            var system3 = new SystemMock();
            engine.addSystem(system3, 1);
            engine.removeSystem(system3);
            expect(engine.systems[0]).to.deep.equal(system2);
            expect(engine.systems[1]).to.deep.equal(system1);
        });

        it('updating should be false before update', () => {
            expect(engine.updating).to.be.false;
        });

        it('updating should be false after the update', () => {
            system1 = new SystemMock();
            engine.addSystem(system1, 10);
            engine.update(0.1);
            expect(engine.updating).to.be.false;
        });

        it('should return the requested system with calling getSystem', () => {
            system1 = new SystemMock();
            engine.addSystem(system1, 0);
            engine.addSystem(new SystemMock2(), 0);
            expect(engine.getSystem(SystemMock)).to.deep.equal(system1);
        });

        it('should return null, if the requested system was not found', () => {
            engine.addSystem(new SystemMock());
            expect(engine.getSystem(SystemMock2)).to.be.null;
        });

        it('should remove all systems when calling removeAll', () => {
            system1 = new SystemMock();
            engine.addSystem(system1, 10);
            system2 = new SystemMock2();
            engine.addSystem(system2, 5);
            engine.removeAllSystems();
            expect(engine.getSystem(system1)).to.be.null;
            expect(engine.getSystem(SystemMock2)).to.be.null;
            expect(engine.systems.length).to.deep.equal(0);
        });
    });
});
