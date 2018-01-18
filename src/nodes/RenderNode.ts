import { CDisplay, CPosition, CGroup } from '../components';

export const RenderNode = {
    name: 'RenderNode',
    entity: null,
    previous: null,
    next: null,
    position: null,
    display: null,
    container: null,
    types: {
        position: CPosition,
        display: CDisplay,
        container: CGroup
    }
};
