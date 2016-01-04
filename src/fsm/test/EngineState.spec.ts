import chai = require('chai');
import {Engine} from '../../core/Engine';
import {EngineStateMachine} from '../EngineStateMachine';
import {EngineState} from '../EngineState';
import {System} from '../../core/System';
import {SystemMock} from '../../core/test/SystemMock';

var expect = chai.expect;

describe('EngineStateMachine', () => {
    let engine:Engine;
    let fsm:EngineStateMachine;


    beforeEach(() => {
        engine = new Engine();
        fsm = new EngineStateMachine(engine);
    });

    afterEach(() => {
        engine = null;
        fsm = null;
    });
    describe.only('- EngineState', () => {

        it('should enter state and adds statesSystems', () => {
            var state:EngineState = new EngineState();
            var system:SystemMock = new SystemMock();
            state.addInstance(system);
            fsm.addState('test', state);
            fsm.changeState('test');
            expect(engine.getSystem(SystemMock)).to.deep.equal(system);
        });
    });
});