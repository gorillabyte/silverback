import chai = require('chai');
import {Engine} from '../Engine';
import {NodeList} from '../NodeList';
import {FamilyMock} from './FamilyMock';
import {NodeMock, NodeMock2, Vec2D, Matrix} from './NodeMock';
import {Entity} from '../Entity';

var expect = chai.expect;

describe('EngineFamilyIntegration', () => {
    var engine:Engine;

    beforeEach(() => {
        engine = new Engine();
    });

    afterEach(() => {
        engine = null;
    });

    it('should test, if the Family is initially empty', () => {
        var nodes:NodeList = engine.getNodeList(NodeMock);
        expect(nodes.head).to.be.null;
    });

    it('node should contain the entity properties', () => {
        var entity:Entity = new Entity();
        var point:Vec2D = new Vec2D(10, 10);
        var matrix:Matrix = new Matrix();
        entity.add(point);
        entity.add(matrix);
        var nodes:NodeList = engine.getNodeList(NodeMock);
        engine.addEntity(entity);
        expect(nodes.head.entity.get(point.constructor)).to.be.equal(point);
        expect(nodes.head.entity.get(matrix.constructor)).to.be.equal(matrix);
    });

    it('should correctly add entity to family, when accessing the family first', () => {
        var entity:Entity = new Entity();
        entity.add(new Vec2D(0, 0));
        entity.add(new Matrix());
        var nodes:NodeList = engine.getNodeList(NodeMock);
        engine.addEntity(entity);
        expect(nodes.head.entity).to.be.deep.equal(entity);
    });

    it('should correctly add entity to family, when accessing the family second', () => {
        var entity:Entity = new Entity();
        entity.add(new Vec2D(0, 0));
        entity.add(new Matrix());
        engine.addEntity(entity);
        var nodes:NodeList = engine.getNodeList(NodeMock);
        expect(nodes.head.entity).to.be.deep.equal(entity);
    });

    it('should correctly add entity to family, when components added', () => {
        var entity:Entity = new Entity();
        engine.addEntity(entity);
        var nodes:NodeList = engine.getNodeList(NodeMock);
        entity.add(new Vec2D(0, 0));
        entity.add(new Matrix());
        expect(nodes.head.entity).to.be.deep.equal(entity);
    });

    xit('should not add incorrect entity to a family, when accessing the family first', () => {
        var entity:Entity = new Entity();
        var nodes:NodeList = engine.getNodeList(NodeMock);
        engine.addEntity(entity);
        expect(nodes.head).to.be.null;
    });

    xit('should removed entity from family, when component removed and family already accessed', () => {
        var entity:Entity = new Entity();
        entity.add(new Vec2D(0, 0));
        entity.add(new Matrix());
        engine.addEntity(entity);
        console.log('ENTITY', entity.toString());
        var nodes : NodeList = engine.getNodeList(NodeMock);
        entity.remove(Vec2D);
        expect(nodes.head).to.be.null;
    });
});