import { IComponent } from '../core/IComponent';
require('pixi-shim');
const PIXI = require('pixi.js');

export class Display implements IComponent {

    public obj:PIXI.DisplayObject;

    constructor(objectPath) {
        this.obj = PIXI.Sprite.fromImage(objectPath);
    }
}
