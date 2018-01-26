(function () {

    // Add stats display on the screen
    let stats = new Stats();
    stats.setMode(0);
    stats.domElement.id = 'stats';
    document.body.appendChild(stats.domElement);

    // Add canvas element to the body
    let gameCanvas = document.createElement("canvas");
    gameCanvas.id = 'gameCanvas';
    gameCanvas.width = 800;
    gameCanvas.height  = 600;
    document.body.appendChild(gameCanvas);

    // Setup PIXI renderer
    PIXI.utils.skipHello();
    let renderer = PIXI.autoDetectRenderer(800, 600, { view: gameCanvas, transparent: true });
    renderer.roundPixels = true;
    renderer.autoResize = true;
    let stage = new PIXI.Container();

    // Setup Silverback engine and add render system
    let engine = new Silverback.Engine();
    engine.addSystem(new Silverback.systems.RenderSystem(renderer, stage), 2);

    // We need to create a game entity and add it to the engine
    let playerEntity = new Silverback.Entity('playerEntity')
        .addComponent(new Silverback.components.Position(100, 100, 0))
        .addComponent(new Silverback.components.Display('assets/img/bunny.png'))
        .addComponent(new Silverback.components.Group());
    engine.addEntity(playerEntity);

    // The animate function is our game loop
    function animate(){
        requestAnimationFrame(animate);
        stats.begin();
        engine.update(Date.now());
        stats.end();
    }

    animate();

})();
