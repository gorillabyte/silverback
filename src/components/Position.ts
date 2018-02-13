import { IComponent } from './IComponent';
import { Vec2D } from '../utils/Vec2D';

export class Position implements IComponent {
    public pos;
    public rot;

    constructor(args: string) {
        const argsElements = args.split(' ');
        const x = parseFloat(argsElements[0]);
        const y = parseFloat(argsElements[1]);
        const rot = parseFloat(argsElements[2]) || 0;
        this.pos = new Vec2D(x, y);
        this.rot = rot;
    }
}
