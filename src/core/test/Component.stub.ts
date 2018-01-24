import { IComponent } from '../IComponent';
require('pixi-shim');
const PIXI = require('pixi.js');

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

export class Position implements IComponent {
    public props = {
        x: null,
        y: null
    };
}

export class Display implements IComponent {
    constructor(path) {
        this.obj = new PIXI.DisplayObject();
    }
    public obj: PIXI.DisplayObject;
}
