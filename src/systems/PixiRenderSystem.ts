import { System } from '../core';
import { RenderNode } from '../nodes';
import { arrayContains } from '../utils/Array';
import { Vec2D } from '../utils/Vec2D';

export class PixiRenderSystem extends System {
    private static stage: PIXI.Container;
    private static renderer: PIXI.CanvasRenderer;
    private nodes: Set<any>;
    private engine;

    constructor(renderer: PIXI.CanvasRenderer, canvasStage: PIXI.Container) {
        super();

        if (!renderer || !canvasStage) {
            throw new Error('PixiRenderSystem - Missing argument');
        }
        if (!(renderer.constructor.name === 'CanvasRenderer') || !(canvasStage.constructor.name === 'Container')) {
            throw new Error('PixiRenderSystem - Wrong argument type');
        }

        PixiRenderSystem.renderer = renderer;
        PixiRenderSystem.stage = canvasStage;
    }

    public addToEngine(engine: Silverback.Engine): void {
        this.nodes = engine.getNodeList(RenderNode);
        this.nodes.forEach(node => {
            PixiRenderSystem.addToDisplay(node);
        });
        this.engine = engine;
    }

    public removeFromEngine(engine: Silverback.Engine): void {
        this.nodes = null;
    }

    public update(time: number): void {
        this.nodes.forEach(node => {
            const display: PIXI.DisplayObject = node.display.sprite;
            const position: Vec2D = node.position.pos;

            if (display.parent === null) {
                PixiRenderSystem.addToDisplay(node);
            }

            display.position.x = position.x;
            display.position.y = position.y;
            display.rotation = node.position.rot;
        });

        PixiRenderSystem.renderer.render(PixiRenderSystem.stage);
    }

    private static addToDisplay(node: any): void {
        if (!arrayContains(PixiRenderSystem.stage.children, node.container.group)) {
            PixiRenderSystem.stage.addChild(node.container.group);
            node.container.group.addChild(node.display.sprite);
        } else {
            node.container.group.addChild(node.display.sprite);
        }
    }
}
