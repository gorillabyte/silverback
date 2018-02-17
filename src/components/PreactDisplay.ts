import { IComponent } from './IComponent';
import { h } from 'preact';

export class PreactDisplay implements IComponent {
    public display: any;
    public posX: number;
    public posY: number;
    public rot: number;

    constructor(component) {
        this.posX = 0;
        this.posY = 0;
        this.rot = 0;
        this.display = h(component, { x: this.posX, y: this.posY, rot: this.rot }, this.display);
    }
}
