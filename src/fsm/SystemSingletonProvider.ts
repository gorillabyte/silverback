import {ISystemProvider} from './ISystemProvider';
import {System} from '../core/System';
/**
 * This System provider always returns the same instance of the System. The instance
 * is created when first required and is of the type passed in to the constructor.
 */
export class SystemSingletonProvider implements ISystemProvider {
    private _componentType;
    private _instance:System;
    private _systemPriority = 0;

    /**
     * Constructor
     *
     * @param type The type of the single System instance
     */
    constructor(type:any) {
        this._componentType = type;
    }

    /**
     * Used to request a System from this provider
     *
     * @return The single instance
     */
    public getSystem():System {
        if (!this._instance) {
            this._instance = new this._componentType();
        }
        return this._instance;
    }

    /**
     * Used to compare this provider with others. Any provider that returns the same single
     * instance will be regarded as equivalent.
     *
     * @return The single instance
     */
    public get identifier() {
        return this.getSystem();
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