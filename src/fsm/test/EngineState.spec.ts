// tslint:disable-next-line
import chai = require('chai');
import { Engine } from '../../';
import { SystemMock } from '../../core/test/System.stub';
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
            engine.addSystem(system, 0);
            fsm.addState('test', state);
            fsm.changeState('test');
            expect(engine.getSystem(SystemMock)).to.deep.equal(system);
        });
    });
});
