export class Vec2D {
    constructor(public x:number, public y:number) {
    }
}

export class Matrix {
}

export var NodeMock = {
    name: 'NodeMock',
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

export var NodeMock2 = {
    name: 'NodeMock2',
    entity: null,
    previous: null,
    next: null,
    matrix: null,
    types: {
        matrix: 'Matrix'
    }
};