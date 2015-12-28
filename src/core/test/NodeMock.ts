import {Node} from '../Node';

export class Vec2D {
    constructor(public x:number, public y:number) {
    }
}

export class Matrix {
}

export class NodeMock extends Node {
    public point:Vec2D;
    public matrix:Matrix;
}

export class NodeMock2 extends Node {
    public matrix:Matrix;
}