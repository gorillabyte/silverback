import { System } from '../core';
import { ISystemProvider } from './ISystemProvider';

/**
 * This System provider always returns the same instance of the component. The system
 * is passed to the provider at initialisation.
 */
export class SystemInstanceProvider implements ISystemProvider {
    private instance: System;
    private systemPriority = 0;

    /**
     * Constructor
     *
     * @param instance The instance to return whenever a System is requested.
     */
    constructor(instance: System) {
        this.instance = instance;
    }

    /**
     * Used to request a component from this provider
     *
     * @return The instance of the System
     */
    public getSystem(): System {
        return this.instance;
    }

    /**
     * Used to compare this provider with others. Any provider that returns the same component
     * instance will be regarded as equivalent.
     *
     * @return The instance
     */
    public get identifier() {
        return this.instance;
    }

    /**
     * The priority at which the System should be added to the Engine
     */
    public get priority(): number {
        return this.systemPriority;
    }

    /**
     * @private
     */
    public set priority(value: number) {
        this.systemPriority = value;
    }
}
