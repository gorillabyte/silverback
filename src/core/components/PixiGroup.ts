import { IComponent } from './IComponent';

export class PixiGroup implements IComponent {
    public group: PIXI.Container;

    constructor() {
        this.group = new PIXI.Container();
    }
}
