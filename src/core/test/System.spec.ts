import chai = require('chai');
import {Engine} from '../Engine';
import {SystemMock, SystemMock2} from './SystemMock';
import {System} from '../System';
let expect = chai.expect;

describe('System unit test', () => {
    var engine:Engine;
    var system1:SystemMock;
    var system2:SystemMock;

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

        xit('should sort the list with there priority when adding to a new system', () => {
        });

        xit('should update in the priority order, if same as addOrder', () => {
        });

        xit('should return the first element of the list', () => {
        });

        xit('should return the last element of the list', () => {
        });

    });
});