import {ISystemProvider} from './ISystemProvider';
import {System} from '../core/System';
/**
 * This System provider always returns the same instance of the component. The system
 * is passed to the provider at initialisation.
 */
export class SystemInstanceProvider implements ISystemProvider {

    private _instance:System;
    private _systemPriority:number = 0;

    /**
     * Constructor
     *
     * @param instance The instance to return whenever a System is requested.
     */
    constructor(instance:System) {
        this._instance = instance;
    }

    /**
     * Used to request a component from this provider
     *
     * @return The instance of the System
     */
    public getSystem():System {
        return this._instance;
    }

    /**
     * Used to compare this provider with others. Any provider that returns the same component
     * instance will be regarded as equivalent.
     *
     * @return The instance
     */
    public get identifier() {
        return this._instance;
    }

    /**
     * The priority at which the System should be added to the Engine
     */
    public get priority():number {
        return this._systemPriority;
    }

    /**
     * @private
     */
    public set priority(value:number) {
        this._systemPriority = value;
    }
}