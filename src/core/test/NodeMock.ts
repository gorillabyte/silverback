export class Vec2D {
    constructor(public x:number, public y:number) {
    }
}

export class NodeMock extends Node {
    public point:Vec2D;
}

export class NodeMock2 extends Node {
    public matrix = {};
}