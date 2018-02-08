export class Stats {
    public mode: number;
    public container: HTMLDivElement;

    public static PR = Math.round(window.devicePixelRatio || 1);
    public static WIDTH = 80 * Stats.PR;
    public static HEIGHT = 48 * Stats.PR;
    public static TEXT_X = 3 * Stats.PR;
    public static TEXT_Y = 2 * Stats.PR;
    public static GRAPH_X = 3 * Stats.PR;
    public static GRAPH_Y = 15 * Stats.PR;
    public static GRAPH_WIDTH = 74 * Stats.PR;
    public static GRAPH_HEIGHT = 30 * Stats.PR;

    private frames: number;
    private beginTime: number;
    private prevTime: number;
    private fpsPanel: Panel;
    private msPanel: Panel;
    private memPanel: Panel;

    constructor() {
        this.mode = 0;
        this.container = document.createElement('div');
        this.container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';
        this.container.addEventListener('click', (event) => {
            event.preventDefault();
            this.showPanel(++this.mode % this.container.children.length);
        }, false);

        this.beginTime = (performance || Date).now();
        this.prevTime = this.beginTime;
        this.frames = 0;
        this.fpsPanel = this.addPanel(new Panel('FPS', '#0ff', '#002'));
        this.msPanel = this.addPanel(new Panel('MS', '#0f0', '#020'));

        if (self.performance && (self.performance as any).memory) {
            this.memPanel = this.addPanel(new Panel('MB', '#f08', '#201'));
        }
        this.showPanel(0);
    }

    get dom() {
        return this.container;
    }

    addPanel(panel) {
        this.container.appendChild(panel.dom);
        return panel;
    }

    showPanel(id) {
        for (let i = 0; i < this.container.children.length; i++) {
            const child = this.container.children[i] as HTMLDivElement;
            child.style.display = i === id ? 'block' : 'none';
        }
        this.mode = id;
    }

    begin() {
        this.beginTime = (performance || Date).now();
    }

    end() {
        this.frames++;
        let time = (performance || Date).now();
        this.msPanel.update(time - this.beginTime, 200);

        if (time >= this.prevTime + 1000) {
            this.fpsPanel.update((this.frames * 1000) / (time - this.prevTime), 100);
            this.prevTime = time;
            this.frames = 0;

            if (this.memPanel) {
                let memory = (self.performance as any).memory;
                this.memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);
            }
        }
        return time;
    }

    update() {
        this.beginTime = this.end();
    }
}

class Panel {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private min: number;
    private max: number;
    private name: any;
    private fg: any;
    private bg: any;

    constructor(name, fg, bg) {
        this.min = Infinity;
        this.max = 0;
        this.name = name;
        this.fg = fg;
        this.bg = bg;

        this.canvas = document.createElement('canvas');
        this.canvas.width = Stats.WIDTH;
        this.canvas.height = Stats.HEIGHT;
        this.canvas.style.cssText = 'width:80px;height:48px';

        this.context = this.canvas.getContext('2d');
        this.context.font = 'bold ' + (9 * Stats.PR) + 'px Helvetica,Arial,sans-serif';
        this.context.textBaseline = 'top';

        this.context.fillStyle = bg;
        this.context.fillRect(0, 0, Stats.WIDTH, Stats.HEIGHT);

        this.context.fillStyle = fg;
        this.context.fillText(name, Stats.TEXT_X, Stats.TEXT_Y);
        this.context.fillRect(Stats.GRAPH_X, Stats.GRAPH_Y, Stats.GRAPH_WIDTH, Stats.GRAPH_HEIGHT);

        this.context.fillStyle = bg;
        this.context.globalAlpha = 0.9;
        this.context.fillRect(Stats.GRAPH_X, Stats.GRAPH_Y, Stats.GRAPH_WIDTH, Stats.GRAPH_HEIGHT);
    }

    get dom() {
        return this.canvas;
    }

    update(value, maxValue) {
        this.min = Math.min(this.min, value);
        this.max = Math.max(this.max, value);

        this.context.fillStyle = this.bg;
        this.context.globalAlpha = 1;
        this.context.fillRect(0, 0, Stats.WIDTH, Stats.GRAPH_Y);
        this.context.fillStyle = this.fg;
        this.context.fillText(Math.round(value) + ' ' + name + ' (' + Math.round(this.min) + '-'
            + Math.round(this.max) + ')', Stats.TEXT_X, Stats.TEXT_Y);
        this.context.drawImage(this.canvas, Stats.GRAPH_X + Stats.PR, Stats.GRAPH_Y, Stats.GRAPH_WIDTH - Stats.PR,
            Stats.GRAPH_HEIGHT, Stats.GRAPH_X, Stats.GRAPH_Y, Stats.GRAPH_WIDTH - Stats.PR, Stats.GRAPH_HEIGHT);
        this.context.fillRect(Stats.GRAPH_X + Stats.GRAPH_WIDTH - Stats.PR, Stats.GRAPH_Y,
            Stats.PR, Stats.GRAPH_HEIGHT);
        this.context.fillStyle = this.bg;
        this.context.globalAlpha = 0.9;
        this.context.fillRect(Stats.GRAPH_X + Stats.GRAPH_WIDTH - Stats.PR, Stats.GRAPH_Y,
            Stats.PR, Math.round((1 - (value / maxValue)) * Stats.GRAPH_HEIGHT));
    }
}
