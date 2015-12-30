import {Node} from '../Node';

export class Vec2D {
    constructor(public x:number, public y:number) {
    }
}

export class Matrix {
}

export class NodeMock extends Node {
    public point:Vec2D = null;
    public matrix:Matrix = null;
    public types = {
        point: 'Vec2D',
        matrix: 'Matrix'
    };
}

export var NewNodeMock = {
    name: 'NewNodeMock',
    entity: null,
    previous: null,
    next: null,
    point: null,
    matrix: null,
    types: {
        point: 'Vec2D',
        matrix: 'Matrix'
    }
};

export class NodeMock2 extends Node {
    public matrix:Matrix = null;
}