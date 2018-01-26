import chai = require('chai');
import { Entity } from '../Entity';
import { Display, Position } from './Component.stub';
import { FamilyMock } from './Family.stub';
import { Engine } from '../Engine';

let expect = chai.expect;

describe('Entity unit test', () => {
    let entity: Entity;
    let engine: Engine;

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
                        "obj":"PIXI.DisplayObject"
                    }
                }
            ]
        }
    ]
}`;

    beforeEach(() => {
        engine = new Engine();
        engine.familyClass = FamilyMock;
        engine.componentClasses = new Map();
        engine.componentClasses.set('Position', Position);
        engine.componentClasses.set('Display', Display);
        FamilyMock.reset();
    });

    afterEach(() => {
        entity = null;
    });

    describe('- Entity JSON', () => {

        it('should create an entity object accorind to the given JSON data', () => {
            engine.addEntityJSON(data);
            expect(engine.entities.length).to.deep.equal(1);
            expect(engine.entities[0].name).to.deep.equal('entity01');
        });

        it('should create an entity object and also add the components to it', () => {
            engine.addEntityJSON(data);
            let componentD: Display = new Display('assets/img/bunny.png');
            expect(engine.entities.length).to.deep.equal(1);
            expect(engine.entities[0].name).to.deep.equal('entity01');
            expect(typeof engine.entities[0].getComponent('Position').pos.x)
                .to.be.equal('number');
            expect(engine.entities[0].getComponent('Position').pos.x)
                .to.be.equal(100);
            expect(engine.entities[0].getComponent('Display').constructor.name)
                .to.be.equal(componentD.constructor.name);
            expect(typeof engine.entities[0].getComponent('Display'))
                .to.be.equal('object');
        });
    });
});
