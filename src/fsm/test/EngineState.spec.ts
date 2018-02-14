import chai = require('chai');
import { Engine } from '../../';
import { SystemMock, SystemMock2 } from '../../core/test/System.stub';
import { EngineState } from '../EngineState';
import { EngineStateMachine } from '../EngineStateMachine';

const expect = chai.expect;

describe('EngineStateMachine', () => {
    let engine: Engine;
    let fsm: EngineStateMachine;

    beforeEach(() => {
        engine = new Engine();
        fsm = new EngineStateMachine(engine);
    });

    afterEach(() => {
        engine = null;
        fsm = null;
    });
    describe('- EngineState', () => {
        it('should enter state and adds statesSystems', () => {
            const state: EngineState = new EngineState();
            const system: SystemMock = new SystemMock();
            state.addInstance(system);
            fsm.addState('test', state);
            fsm.changeState('test');
            expect(engine.getSystem(SystemMock)).to.deep.equal(system);
        });

        it('should enter second state and adds second state system', () => {
            const state: EngineState = new EngineState();
            const system: SystemMock = new SystemMock();
            state.addInstance(system);
            fsm.addState('test1', state);
            fsm.changeState('test1');

            const state2: EngineState = new EngineState();
            const system2: SystemMock2 = new SystemMock2();
            state2.addInstance(system2);
            fsm.addState('test2', state2);
            fsm.changeState('test2');

            expect(engine.getSystem(SystemMock2)).to.deep.equal(system2);
        });

        it('should enter second state and removes the first states system', () => {
            const state: EngineState = new EngineState();
            const system: SystemMock = new SystemMock();
            state.addInstance(system);
            fsm.addState('test1', state);
            fsm.changeState('test1');

            const state2: EngineState = new EngineState();
            const system2: SystemMock2 = new SystemMock2();
            state2.addInstance(system2);
            fsm.addState('test2', state2);
            fsm.changeState('test2');

            expect(engine.getSystem(SystemMock)).to.be.null;
        });

        it('should enter second state and does not remove overlapping systems', () => {
            const state: EngineState = new EngineState();
            const system: SystemMock = new SystemMock();
            state.addInstance(system);
            fsm.addState('test1', state);
            fsm.changeState('test1');

            const state2: EngineState = new EngineState();
            const system2: SystemMock2 = new SystemMock2();
            state2.addInstance(system);
            state2.addInstance(system2);
            fsm.addState('test2', state2);
            fsm.changeState('test2');

            expect(system.removeFromEngineCalls).to.equal(0);
            expect(engine.getSystem(SystemMock)).to.deep.equal(system);
        });

        it('should enter second state and removes different system of the same type', () => {
            const state: EngineState = new EngineState();
            const system: SystemMock = new SystemMock();
            state.addInstance(system);
            fsm.addState('test1', state);
            fsm.changeState('test1');

            const state2: EngineState = new EngineState();
            const system3: SystemMock = new SystemMock();
            const system2: SystemMock2 = new SystemMock2();
            state2.addInstance(system3);
            state2.addInstance(system2);
            fsm.addState('test2', state2);
            fsm.changeState('test2');

            expect(engine.getSystem(SystemMock)).to.deep.equal(system3);
        });
    });
});
