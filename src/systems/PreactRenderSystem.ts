import { System } from '../core';
import { PreactRenderNode } from '../nodes';
import { Vec2D } from '../utils/Vec2D';
import { h, render, options } from 'preact';
import { PreactWrapper } from './PreactWrapper';

export class PreactRenderSystem extends System {
    private nodes: Set<any>;
    private engine;
    private container;
    private itemList: any[];
    private el;

    constructor(container) {
        super();

        this.container = container;
        this.itemList = [];
    }

    public addToEngine(engine): void {
        options.debounceRendering = engine.gameLoop.loop as any;
        options.syncComponentUpdates = true;
        this.el = render(h(PreactWrapper as any, { items: this.itemList }), this.container);
        this.nodes = engine.getNodeList(PreactRenderNode);
        this.engine = engine;
    }

    public removeFromEngine(engine: Silverback.Engine): void {
        this.nodes = null;
    }

    public update(time: number): void {
        this.nodes.forEach(node => {
            const display = node.display.display;
            const position: Vec2D = node.position.pos;

            if (this.itemList.indexOf(node.display.display) === -1) {
                this.itemList.push(node.display.display);
            }

            display.attributes['x'] = position.x;
            display.attributes['y'] = position.y;
            display.attributes['rot'] = display.attributes['rot'];
        });
        this.el = render(h(PreactWrapper as any, { items: this.itemList }), this.container, this.el);
    }
}
