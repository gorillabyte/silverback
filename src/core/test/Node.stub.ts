import { Vec2D, Matrix, Position, PixiDisplay } from './Component.stub';

export const NodeMock = {
    name: 'NodeMock',
    entity: null,
    point: null,
    matrix: null,
    schema: {
        point: Vec2D,
        matrix: Matrix
    }
};

export const NewNodeMock = {
    name: 'NewNodeMock',
    entity: null,
    point: null,
    matrix: null,
    schema: {
        point: Vec2D,
        matrix: Matrix
    }
};

export const NodeMock2 = {
    name: 'NodeMock2',
    entity: null,
    position: null,
    display: null,
    schema: {
        position: Position,
        display: PixiDisplay
    }
};
