export const PIXI = mockPIXI();

function mockPIXI() {
    class Sprite {
        public parent;
        public position;

        constructor(args) {
            this.parent = null;
            this.position = {
                x: 0,
                y: 0
            };
        }
    }
    class Container {
        public children = [];
        addChild(newObj) {
            this.children.push(newObj);
        }
    }
    class CanvasRenderer {
        render(canvas) {
            /* mock function */
        }
    }

    return {
        Sprite,
        Container,
        CanvasRenderer,
        renderer: new CanvasRenderer()
    };
}
