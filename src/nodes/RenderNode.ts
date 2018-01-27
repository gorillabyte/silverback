import { Display, Group, Position } from '../components';

export const RenderNode = {
    container: null,
    display: null,
    entity: null,
    name: 'RenderNode',
    next: null,
    position: null,
    previous: null,
    types: {
        container: Group,
        display: Display,
        position: Position,
    },
};
