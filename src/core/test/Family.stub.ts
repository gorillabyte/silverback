import { Entity } from '../Entity';
import { Engine } from '../Engine';
import { IFamily } from '../IFamily';

export class FamilyMock implements IFamily {
    public static instances: Array<FamilyMock> = [];
    private _nodes: Set<any>;

    public newEntityCalls = 0;
    public removeEntityCalls = 0;
    public componentAddedCalls = 0;
    public componentRemovedCalls = 0;
    public cleanUpCalls = 0;

    constructor(nodeClass: any, engine: Engine) {
        FamilyMock.instances.push(this);
        this._nodes = new Set();
    }

    public get nodeList(): Set<any> {
        return this._nodes;
    }

    public newEntity(entity: Entity) {
        this.newEntityCalls++;
    }

    public removeEntity(entity: Entity) {
        this.removeEntityCalls++;
    }

    public componentAddedToEntity(entity: Entity, componentClass: () => any) {
        this.componentAddedCalls++;
    }

    public componentRemovedFromEntity(entity: Entity, componentClass: () => any) {
        this.componentRemovedCalls++;
    }

    public cleanUp() {
        this.cleanUpCalls++;
    }

    static reset(): void {
        FamilyMock.instances = [];
    }
}
