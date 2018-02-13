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
                    "args":"100 100"
                },
                {
                    "type":"PixiDisplay",
                    "args":"assets/img/bunny.png"
                },
                {
                    "type":"PixiGroup",
                    "args":""
                }
            ]
        }
    ]
}`;

    // Setup Silverback engine and add render system
    let engine = new Silverback.Engine();
    engine.addSystem(new Silverback.systems.PixiRenderSystem(renderer, stage), 2);

    // We parse the data for the entity and the components to the engine
    engine.addEntityJSON(data);
    // Add stats display on the screen
    engine.gameLoop.showStats = true;
    // The animate function is our game loop
    engine.gameLoop.run();

})();
