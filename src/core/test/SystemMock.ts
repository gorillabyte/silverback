import {System} from '../System';

export class SystemMock extends System{

    public removeFromEngineCalls = 0;
    public addToEngineCalls = 0;
    public updateCalls = 0;

    constructor() {
        super();
    }

    addToEngine(engine:any) {
        this.addToEngineCalls++;
    }

    removeFromEngine(engine:any) {
        this.removeFromEngineCalls++;
    }

    update(time:number) {
        this.updateCalls++;
    }

}