import { IComponent } from '../components/IComponent';

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

declare namespace MockPIXI {
    export class Sprite {
    }
    export class Container {
    }
}

export class Position implements IComponent {
    public pos: Vec2D;
    public rot:number;

    constructor(x: number, y: number, rotation = 0) {
        this.pos = new Vec2D(x, y);
        this.rot = rotation;
    }
}

export class Display implements IComponent {
    constructor(path:string) {
        /* mocking object */
    }
}

export class Group implements IComponent {
    constructor() {
        /* mocking object */
    }
}
