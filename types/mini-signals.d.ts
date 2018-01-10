declare class MiniSignalBinding {
    constructor(fn:() => void, once:boolean, thisArg:any);
    detach():void;
}
declare class MiniSignal {
    constructor();
    handlers(exists:boolean):MiniSignalBinding[];
    handlers(exists:boolean):boolean;
    has(node:MiniSignalBinding):boolean;
    detach(node:MiniSignalBinding):MiniSignal;
    dispatch():boolean;
    add(fn:() => void, thisArg:any):MiniSignalBinding;
    once(fn:() => void, thisArg:any):MiniSignalBinding;
    detachAll():void;
}