import { System } from '../core/System';
import { ISystemProvider } from './ISystemProvider';

/**
 * This System provider returns results of a method call. The method
 * is passed to the provider at initialisation.
 */
export class DynamicSystemProvider implements ISystemProvider {
    private _method: () => {};
    private _systemPriority = 0;

    /**
     * Constructor
     *
     * @param method The method that returns the System instance;
     */
    constructor(method: () => {}) {
        this._method = method;
    }

    /**
     * Used to request a component from this provider
     *
     * @return The instance of the System
     */
    public getSystem(): System {
        return this._method() as System;
    }

    /**
     * Used to compare this provider with others. Any provider that returns the same component
     * instance will be regarded as equivalent.
     *
     * @return The method used to call the System instances
     */
    public get identifier() {
        return this._method;
    }

    /**
     * The priority at which the System should be added to the Engine
     */
    public get priority(): number {
        return this._systemPriority;
    }

    public set priority(value: number) {
        this._systemPriority = value;
    }
}
