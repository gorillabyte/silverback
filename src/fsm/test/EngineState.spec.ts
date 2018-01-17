import chai = require('chai');
import { Engine } from '../../';
import { EngineStateMachine } from '../EngineStateMachine';
import { EngineState } from '../EngineState';
import { SystemMock } from '../../core/test/System.stub';

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
            let state: EngineState = new EngineState();
            let system: SystemMock = new SystemMock();
            engine.addSystem(system, 0);
            fsm.addState('test', state);
            fsm.changeState('test');
            expect(engine.getSystem(SystemMock)).to.deep.equal(system);
        });
    });
});
