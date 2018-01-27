import { Display, Group, Position } from '../components';
import { INode } from './INode';

export const RenderNode = <INode>{
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
