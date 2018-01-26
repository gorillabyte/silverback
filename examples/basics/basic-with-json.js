/*
 * Copyright 2015-2018 Gorillabyte and Silverback Project Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

    const data = `{
    "entities":[
        {
            "name":"entity01",
            "components":[
                {
                    "type":"Position",
                    "props":{
                        "pos": "100 100"
                    },
                    "propsTypes":{
                        "pos":"Vec2D"
                    }
                },
                {
                    "type":"Display",
                    "props":{
                        "obj":"assets/img/bunny.png"
                    },
                    "propsTypes":{
                        "obj":"PIXI.Sprite"
                    }
                },
                {
                    "type":"Group",
                    "props":{},
                    "propsTypes":{
                        "obj":"PIXI.Container"
                    }
                }
            ]
        }
    ]
}`;

    // Setup Silverback engine and add render system
    let engine = new Silverback.Engine();
    engine.addSystem(new Silverback.systems.RenderSystem(renderer, stage), 2);

    // To show something on the screen we add the PIXI bunny.
    //let bunny = PIXI.Sprite.fromImage('assets/img/bunny.png');
    //let characterContainer = new PIXI.Container();

    // We need to create a game entity and add it to the engine
    engine.addEntityJSON(data);

    /*.addComponent(new Silverback.components.Position(100, 100, 0))
    .addComponent(new Silverback.components.Display(bunny))
    .addComponent(new Silverback.components.Group(characterContainer));
    engine.addEntity(playerEntity);*/

    // The animate function is our game loop
    function animate(){
        requestAnimationFrame(animate);
        stats.begin();
        engine.update(Date.now());
        stats.end();
    }

    animate();

})();
