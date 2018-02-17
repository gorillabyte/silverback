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

    let uiCanvas = document.createElement("div");
    uiCanvas.style.width = 800;
    uiCanvas.style.height = 600;
    uiCanvas.style.top = 100;
    uiCanvas.style.left = 200;
    uiCanvas.style.zIndex = 1;
    uiCanvas.style.position = 'absolute';
    uiCanvas.id = 'app';
    document.body.appendChild(uiCanvas);

    // Setup Silverback engine and add render system
    let engine = new Silverback.Engine();
    engine.addSystem(new Silverback.systems.PixiRenderSystem(renderer, stage), 2);
    engine.addSystem(new Silverback.systems.PreactRenderSystem(uiCanvas), 1);

    // We need to create a game entity and add it to the engine
    let playerEntity = new Silverback.Entity('playerEntity')
        .addComponent(new Silverback.components.Position('100 100 0'))
        .addComponent(new Silverback.components.PixiDisplay('assets/img/bunny.png'))
        .addComponent(new Silverback.components.PixiGroup());
    engine.addEntity(playerEntity);

    let { Component, h } = preact;
    // We test the integration with a basic component to control the bunny position
    class TestItem extends Component {
        constructor(props) {
            super(props);
        }
        clickItem(){
            let bunnyPos = engine.getEntityByName('playerEntity').getComponent('Position');
            bunnyPos.pos.x += 10;
            bunnyPos.pos.y += 10;
        }
        render(props, state) {
            const style = {
                top: this.props.y,
                left: this.props.x,
                display: 'block',
                backgroundColor: 'red',
                width: '20px',
                height: '20px',
                position: 'absolute'
            };
            return h('span', {style:style, onClick: this.clickItem});
        }
    }
    // We create a ui entity and add it to the engine
    let uiEntity = new Silverback.Entity('uiEntity')
        .addComponent(new Silverback.components.Position('200 200 0'))
        .addComponent(new Silverback.components.PreactDisplay(TestItem));
    engine.addEntity(uiEntity);

    // Add stats display on the screen
    engine.gameLoop.showStats = true;
    // The animate function is our game loop
    engine.gameLoop.run();

})();
