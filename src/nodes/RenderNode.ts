import { PixiDisplay, PixiGroup, Position } from '../components';
import { INode } from './INode';

export const RenderNode = <INode>{
    container: null,
    display: null,
    entity: null,
    name: 'RenderNode',
    position: null,
    types: {
        container: PixiGroup,
        display: PixiDisplay,
        position: Position,
    },
};
