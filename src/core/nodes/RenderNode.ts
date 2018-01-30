import { PixiDisplay, PixiGroup, Position } from '../components/index';
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
        container: PixiGroup,
        display: PixiDisplay,
        position: Position,
    },
};
