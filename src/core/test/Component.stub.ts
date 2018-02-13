import { IComponent } from '../../components/IComponent';

export class ComponentMock {
    public value: number;
}

export class ComponentMock2 {
    public value: string;
}

export class ComponentMockExtended extends ComponentMock {
    public other: number;
}

export class Vec2D {
    constructor(public x: number, public y: number) {
    }
}

export class Matrix {
}

export declare namespace PIXI {
    export class Sprite {
    }
    export class Container {
    }
}

export class Position implements IComponent {
    public pos: Vec2D;
    public rot:number;

    constructor(args:string) {
        const argsElements = args.split(' ');
        const x = parseFloat(argsElements[0]);
        const y = parseFloat(argsElements[1]);
        const rot = parseFloat(argsElements[2]) || 0;
        this.pos = new Vec2D(x, y);
        this.rot = rot;
    }
}

export class PixiDisplay implements IComponent {
    constructor(args:string) {
        /* mocking object */
    }
}

export class Group implements IComponent {
    constructor() {
        /* mocking object */
    }
}
