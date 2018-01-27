import { System } from '../System';
import { NodeMock } from './Node.stub';
import LinkedList = Silverback.LinkedList;

export class SystemMock extends System {
    public removeFromEngineCalls = 0;
    public addToEngineCalls = 0;
    public updateCalls = 0;
    public nodes: LinkedList;

    constructor() {
        super();
    }

    addToEngine(engine: any) {
        this.addToEngineCalls++;
        this.nodes = engine.getNodeList(NodeMock);
    }

    removeFromEngine(engine: any) {
        this.removeFromEngineCalls++;
        this.nodes = null;
    }

    update(time: number) {
        this.updateCalls++;
    }
}

export class SystemMock2 extends System {
    public removeFromEngineCalls = 0;
    public addToEngineCalls = 0;
    public updateCalls = 0;
    public nodes: LinkedList;

    constructor() {
        super();
    }

    addToEngine(engine: any) {
        this.addToEngineCalls++;
        this.nodes = engine.getNodeList(NodeMock);
    }

    removeFromEngine(engine: any) {
        this.removeFromEngineCalls++;
        this.nodes = null;
    }

    update(time: number) {
        this.updateCalls++;
    }
}
