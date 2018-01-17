(function () {

    let gameCanvas = document.createElement("canvas");
    gameCanvas.id = 'gameCanvas';
    gameCanvas.width = 800;
    gameCanvas.height  = 600;
    document.body.appendChild(gameCanvas);

    PIXI.utils.skipHello();
    let renderer = PIXI.autoDetectRenderer(800, 600, { view: gameCanvas, transparent: true });
    renderer.roundPixels = true;
    renderer.autoResize = true;
    let stage = new PIXI.Container();

    let engine = new Silverback.Engine();
    engine.addSystem(new Silverback.systems.RenderSystem(renderer, stage), 2);

    let bunny = PIXI.Sprite.fromImage('assets/img/bunny.png');
    let characterContainer = new PIXI.Container();
    characterContainer.name = 'character';
    characterContainer.addChild(bunny);
    stage.addChild(characterContainer);

    let playerEntity = new Silverback.Entity('playerEntity')
        .addComponent(new Silverback.components.CPosition(100, 100, 0))
        .addComponent(new Silverback.components.CDisplay(bunny))
        .addComponent(new Silverback.components.CGroup(characterContainer));

    engine.addEntity(playerEntity);

    function animate(){
        requestAnimationFrame(animate);

        //stats.begin();
        engine.update(Date.now());
        //stats.end();
    }

    animate();
    console.log('test', engine.entities);
})();
