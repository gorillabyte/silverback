import { RenderNode } from '../nodes';
import { Vec2D } from '../utils/Vec2D';
import { System } from '../core';
import { arrayContains } from '../utils/Array';

export class RenderSystem extends System {

    private _nodes:Silverback.LinkedList;
    private _engine;
    private static stage;
    private static renderer;

    constructor(renderer, canvasStage) {
        super();

        RenderSystem.renderer = renderer;
        RenderSystem.stage = canvasStage;
    }

    public addToEngine(engine:Silverback.Engine):void {
        this._nodes = engine.getNodeList(RenderNode);
        for (let node = this._nodes.first; node; node = node.next) {
            this.addToDisplay(node);
        }
        this._engine = engine;
    }

    public removeFromEngine(engine:Silverback.Engine):void {
        this._nodes = null;
    }

    public addToDisplay(node:any):void {
        if (node.container !== null) {
            if (!arrayContains(RenderSystem.stage.children, node.container.container)) {
                RenderSystem.stage.addChild(node.container.container);
                node.container.container.addChild(node.display.obj);

            } else {
                node.container.container.addChild(node.display.obj);
            }

        } else {
            if(typeof node !== 'undefined') {
                RenderSystem.stage.addChild(node.display.obj);
            }
        }
    }

    public update(time:number):void {
        for (let node = this._nodes.first; node; node = node.next) {
            let display:PIXI.DisplayObject = node.display.obj;
            let position:Vec2D = node.position.pos;

            if(display.parent === null) {
                this.addToDisplay(node);
            }

            display.position.x = position.x;
            display.position.y = position.y;
            display.rotation = node.position.rot;
        }
        RenderSystem.renderer.render(RenderSystem.stage);
    }
}
