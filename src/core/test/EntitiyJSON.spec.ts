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
                        "x":0,
                        "y":0
                    },
                    "propsTypes":{
                        "x":"number",
                        "y":"number"
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
        // entity = new Entity();
        engine = new Engine();
        engine.familyClass = FamilyMock;
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
            let componentP: Position = new Position();
            let componentD: Display = new Display('assets/img/bunny.png');
            expect(engine.entities.length).to.deep.equal(1);
            expect(engine.entities[0].name).to.deep.equal('entity01');
            expect(Object.keys(engine.entities[0].getComponent('Position').props))
                .to.deep.equal(Object.keys(componentP.props));
            expect(typeof engine.entities[0].getComponent('Position').props.x)
                .to.be.equal('number');
            expect(engine.entities[0].getComponent('Position').props.x)
                .to.be.equal(0);
            expect(Object.keys(engine.entities[0].getComponent('Display').obj))
                .to.deep.equal(Object.keys(componentD.obj));
            expect(typeof engine.entities[0].getComponent('Display').obj)
                .to.be.equal('object');
        });
    });
});
