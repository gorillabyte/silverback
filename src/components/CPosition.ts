import { Vec2D } from '../utils/Vec2D';

export class CPosition {

    public position;
    public rotation;

    constructor(x: number, y: number, rotation = 0) {
        this.position = new Vec2D(x, y);
        this.rotation = rotation;
    }
}
