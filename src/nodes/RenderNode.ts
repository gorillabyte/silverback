import { Display, Position, Group } from '../components';

export const RenderNode = {
    name: 'RenderNode',
    entity: null,
    previous: null,
    next: null,
    position: null,
    display: null,
    container: null,
    types: {
        position: Position,
        display: Display,
        container: Group
    }
};
