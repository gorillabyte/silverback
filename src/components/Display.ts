import { IComponent } from '../core/IComponent';

export class Display implements IComponent {
    public obj: PIXI.Sprite;

    constructor(path) {
        if (path) {
            this.obj = PIXI.Sprite.fromImage(path, true);
        }
    }
}
