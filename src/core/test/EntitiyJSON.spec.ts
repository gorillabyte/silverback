import chai = require('chai');
import { Entity } from '../Entity';
import { PixiDisplay, Position } from './Component.stub';
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
                    "args":"100 100"
                },
                {
                    "type":"PixiDisplay",
                    "args":"assets/img/bunny.png"
                }
            ]
        }
    ]
}`;
    const wrongData = `{
    "entities":[
        {
            "name":"entity01",
            "components":[
                {
                    "type":"XPosition",
                    "args":"100 100"
                }
            ]
        }
    ]
}`;

    const wrongData2 = `{
    "entities":[
        {
            "name":"entity01",
            "components":[
                {
                    "type":"Position",
                    "prop":"100 100"
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
        engine.componentClasses.set('PixiDisplay', PixiDisplay);
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
            let componentD: PixiDisplay = new PixiDisplay('assets/img/bunny.png');
            expect(engine.entities.length).to.deep.equal(1);
            expect(engine.entities[0].name).to.deep.equal('entity01');
            expect(typeof engine.entities[0].getComponent('Position').pos.x).to.be.equal('number');
            expect(engine.entities[0].getComponent('Position').pos.x).to.be.equal(100);
            expect(engine.entities[0].getComponent('PixiDisplay').constructor.name).to.be.equal(
                componentD.constructor.name
            );
            expect(typeof engine.entities[0].getComponent('PixiDisplay')).to.be.equal('object');
        });

        it('should throw an error by adding a components which is not registered in the engine', () => {
            expect(() => {
                engine.addEntityJSON(wrongData);
            }).to.throw('The component class: "XPosition" is not registered in the engine.');
        });

        it('should throw an error if the JSON string does not includes the needed props', () => {
            expect(() => {
                engine.addEntityJSON(wrongData2);
            }).to.throw('The component has not all needed properties specified.');
        });
    });
});
