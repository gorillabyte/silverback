import {Dictionary} from '../utils/Dictionary';
import {EngineState} from './EngineState';
import {Engine} from '../core/Engine';
import {ISystemProvider} from './ISystemProvider';
/**
 * This is a state machine for the Engine. The state machine manages a set of states,
 * each of which has a set of System providers. When the state machine changes the state, it removes
 * Systems associated with the previous state and adds Systems associated with the new state.
 */
export class EngineStateMachine {
    public engine:Engine;
    private states:Dictionary;
    private currentState:EngineState;

    /**
     * Constructor. Creates an SystemStateMachine.
     */
    constructor(engine:Engine) {
        this.engine = engine;
        this.states = new Dictionary();
    }

    /**
     * Add a state to this state machine.
     *
     * @param name The name of this state - used to identify it later in the changeState method call.
     * @param state The state.
     * @return This state machine, so methods can be chained.
     */
    public addState(name:string, state:EngineState):EngineStateMachine {
        this.states.add(name, state);
        return this;
    }

    /**
     * Create a new state in this state machine.
     *
     * @param name The name of the new state - used to identify it later in the changeState method call.
     * @return The new EntityState object that is the state. This will need to be configured with
     * the appropriate component providers.
     */
    public createState(name:string):EngineState {
        let state:EngineState = new EngineState();
        this.states.add(name, state);
        return state;
    }

    /**
     * Change to a new state. The Systems from the old state will be removed and the Systems
     * for the new state will be added.
     *
     * @param name The name of the state to change to.
     */
    public changeState(name:string):void {
        let newState:EngineState = this.states.getValue(name);
        let toAdd:Dictionary = new Dictionary();
        let id;

        if(!newState) {
            throw( new Error( 'Engine state ' + name + ' doesn\'t exist' ));
        }
        if(newState === this.currentState ) {
            newState = null;
            return;
        }

        newState.providers.forEach( function(provider:ISystemProvider) {
            id = provider.identifier;
            toAdd.add(id, provider);
        });
        if(this.currentState) {
            this.currentState.providers.forEach( (provider:ISystemProvider) => {
                id = provider.identifier;
                var other:ISystemProvider = toAdd.getValue(id);

                if (other) {
                    delete toAdd.getValue(id);
                } else {
                    this.engine.removeSystem(provider.getSystem());
                }
            });
        }
        toAdd.forEach( (provider) => {
            this.engine.addSystem(provider, provider.priority);
        });
        this.currentState = newState;
    }
}