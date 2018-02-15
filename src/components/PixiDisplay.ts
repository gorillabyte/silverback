import { IComponent } from './IComponent';

export class PixiDisplay implements IComponent {
    public sprite: PIXI.Sprite;

    constructor(path) {
        if (path) {
            this.sprite = window.PIXI.Sprite.fromImage(path, true);
        }
    }
}
