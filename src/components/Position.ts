import { Vec2D } from '../utils/Vec2D';
import { IComponent } from '../core/IComponent';

export class Position implements IComponent {

    public pos;
    public rot;

    constructor(x: number, y: number, rotation = 0) {
        this.pos = new Vec2D(x, y);
        this.rot = rotation;
    }
}
