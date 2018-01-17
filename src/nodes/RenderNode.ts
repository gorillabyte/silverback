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

export const RenderNodeNew = new Map();

RenderNodeNew.set('name', 'RenderNode');
RenderNodeNew.set('entity', null);
RenderNodeNew.set('previous', null);
RenderNodeNew.set('next', null);
RenderNodeNew.set('position', null);
RenderNodeNew.set('display', null);
RenderNodeNew.set('container', null);
RenderNodeNew.set('types', {
    position: CPosition,
    display: CDisplay,
    container: CGroup
});
