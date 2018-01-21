import { IComponent } from '../core/IComponent';

export class Display implements IComponent {

    public displayObject:PIXI.DisplayObject;

    constructor(displayObject) {
        this.displayObject = displayObject;
    }
}
