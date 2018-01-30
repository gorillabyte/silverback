import { System } from '../index';
import { RenderNode } from '../nodes/index';
import { arrayContains } from '../../utils/Array';
import { Vec2D } from '../../utils/Vec2D';

export class PixiRenderSystem extends System {
    private static stage;
    private static renderer;
    private nodes: Silverback.LinkedList; // TODO: refactor to Set object
    private engine;

    constructor(renderer, canvasStage) {
        super();

        PixiRenderSystem.renderer = renderer;
        PixiRenderSystem.stage = canvasStage;
    }

    public addToEngine(engine: Silverback.Engine): void {
        this.nodes = engine.getNodeList(RenderNode);
        for (let node = this.nodes.first; node; node = node.next) {
            PixiRenderSystem.addToDisplay(node);
        }
        this.engine = engine;
    }

    public removeFromEngine(engine: Silverback.Engine): void {
        this.nodes = null;
    }

    public update(time: number): void {
        for (let node = this.nodes.first; node; node = node.next) {
            const display: PIXI.DisplayObject = node.display.sprite;
            const position: Vec2D = node.position.pos;

            if (display.parent === null) {
                PixiRenderSystem.addToDisplay(node);
            }

            display.position.x = position.x;
            display.position.y = position.y;
            display.rotation = node.position.rot;
        }
        PixiRenderSystem.renderer.render(PixiRenderSystem.stage);
    }

    private static addToDisplay(node: any): void {
        if (node.container !== null) {
            if (!arrayContains(PixiRenderSystem.stage.children, node.container.group)) {
                PixiRenderSystem.stage.addChild(node.container.group);
                node.container.group.addChild(node.display.sprite);
            } else {
                node.container.group.addChild(node.display.sprite);
            }
        } else {
            if (typeof node !== 'undefined') {
                PixiRenderSystem.stage.addChild(node.display.obj);
            }
        }
    }
}
