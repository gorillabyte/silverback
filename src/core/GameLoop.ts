import { Stats } from '../utils/Stats';

export class GameLoop {
    static showStats: boolean;
    static engine: Silverback.Engine;
    static stats: Stats;

    /**
     * The gameLoop needs the engine as parameter to reference it later in the update loop.
     * @param {Silverback.Engine} engine
     */
    constructor(engine) {
        GameLoop.engine = engine;
    }

    /**
     * With this public property you can enable or disable the stats display
     * @param {boolean} value
     */
    set showStats(value: boolean) {
        GameLoop.showStats = value;
        const domElement = document.getElementById('stats');

        if(!domElement && value) {
            GameLoop.stats = new Stats();
            GameLoop.stats.showPanel(0);
            GameLoop.stats.dom.id = 'stats';
            document.body.appendChild(GameLoop.stats.dom);

        } else if(domElement && !value) {
            document.body.removeChild(GameLoop.stats.dom);
            GameLoop.stats = undefined;
        }
    }

    /**
     * The run method starts the game loop
     */
    public run() {
        GameLoop.loop();
    }

    private static loop() {
        requestAnimationFrame(GameLoop.loop);
        if (GameLoop.showStats) {
            GameLoop.stats.begin();
        }

        GameLoop.engine.update(window.performance.now());

        if (GameLoop.showStats) {
            GameLoop.stats.end();
        }
    }
}


