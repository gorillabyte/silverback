export class Vec2D {
    constructor(public x: number, public y: number) {
    }
}

export class Matrix {
}

export class Position {
}

export class CDisplay {
}

export const NodeMock = {
    name: 'NodeMock',
    entity: null,
    previous: null,
    next: null,
    point: null,
    matrix: null,
    types: {
        point: Vec2D,
        matrix: Matrix
    }
};

export const NewNodeMock = {
    name: 'NewNodeMock',
    entity: null,
    previous: null,
    next: null,
    point: null,
    matrix: null,
    types: {
        point: Vec2D,
        matrix: Matrix
    }
};

export const NodeMock2 = {
    name: 'NodeMock2',
    entity: null,
    previous: null,
    next: null,
    position: null,
    display: null,
    types: {
        position: Position,
        display: CDisplay
    }
};
