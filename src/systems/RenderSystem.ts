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
        for (let i = 0; i < this._nodes.size(); i++) {
            this.addToDisplay(this._nodes.item(i));
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
                node.container.container.addChild(node.display.displayObject);

            } else {
                node.container.container.addChild(node.display.displayObject);
            }

        } else {
            if(typeof node !== 'undefined') {
                RenderSystem.stage.addChild(node.display.displayObject);
            }
        }
    }

    public static removeFromDisplay(node:any):void {
        let layers:any = RenderSystem.stage.children;
        let lengthCount = layers.length;
        let nodeDisplay = node.display.displayObject;

        for(let i = 0; i < lengthCount; i++) {
            for(let j = 0; j < layers[i].children.length; j++) {
                if(nodeDisplay.name === layers[i].children[j].name) {
                    nodeDisplay.parent.removeChild(nodeDisplay);
                    RenderSystem.stage.removeChild(nodeDisplay);
                    return;
                }
            }
        }
    }

    public static removeFromStage(objName:string):void {
        let layers:any = RenderSystem.stage.children;
        let lengthCount = layers.length;

        for(let i = 0; i < lengthCount; i++) {
            if(objName === layers[i].name) {
                RenderSystem.stage.removeChild(layers[i]);
                return;
            }
        }
    }

    public update(time:number):void {
        for (let node = this._nodes.first; node; node = node.next) {
            // let node = this._nodes.item(i);
            let display:PIXI.DisplayObject = node.display.displayObject;
            let position:Vec2D = node.position.position;

            if(display.parent === null) {
                this.addToDisplay(node);
            }

            display.position.x = position.x;
            display.position.y = position.y;
            display.rotation = node.position.rotation;
        }
        RenderSystem.renderer.render(RenderSystem.stage);
    }
}
