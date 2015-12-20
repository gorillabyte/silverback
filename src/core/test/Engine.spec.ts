/// <reference path="../../../typings/tsd.d.ts" />

import {Engine} from '../Engine';
import {Entity} from '../Entity';
import {FamilyMock} from './FamilyMock';

describe('Engine', function() {
    var engine:Engine;

    beforeEach(() => {
        engine = new Engine();
        engine.familyClass = FamilyMock;
        FamilyMock.reset();
    });

    afterEach(() => {
        engine = null;
    });

    it('should return all entities added to the engine', () => {
        var entity1:Entity = new Entity();
        engine.addEntity( entity1 );

        var entity2:Entity = new Entity();
        engine.addEntity( entity2 );

        expect(engine.entities.length).toBe(2);
        expect(engine.entities).toContain(entity1, entity2);
    });

    it('should return the correct entity by name', () => {
        var entity1:Entity = new Entity();
        entity1.name = 'otherEntity';
        engine.addEntity( entity1 );

        var entity2:Entity = new Entity();
        entity2.name = 'myEntity';
        engine.addEntity(entity2);

        expect(engine.getEntityByName('myEntity')).toEqual(entity2);
    });

});