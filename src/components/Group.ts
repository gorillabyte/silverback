import { IComponent } from '../core/IComponent';

export class Group implements IComponent {

    public container:PIXI.Container;

    constructor() {
        this.container = new PIXI.Container();
    }
}
