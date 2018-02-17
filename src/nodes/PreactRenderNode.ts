import { PreactDisplay, Position } from '../components';
import { INode } from './INode';

export const PreactRenderNode = <INode>{
    display: null,
    entity: null,
    name: 'PreactRenderNode',
    position: null,
    schema: {
        display: PreactDisplay,
        position: Position,
    },
};
