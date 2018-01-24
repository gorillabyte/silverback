import { Vec2D, Matrix, Position, Display } from './Component.stub';

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
        display: Display
    }
};
