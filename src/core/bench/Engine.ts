import { Entity } from '../Entity';
import { FamilyMock } from '../test/Family.stub';
import { Engine } from '../Engine';
import { SystemMock, SystemMock2 } from '../test/System.stub';

const bench = require('benchmark');
const s = new bench.Suite;

s.add('AddEntityToEngine', function () {
    let engine = new Engine();
    engine.familyClass = FamilyMock;
    let entity1: Entity = new Entity();
    engine.addEntity(entity1);
    let entity2: Entity = new Entity();
    engine.addEntity(entity2);
})
    .add('AddSystemToEngine', function () {
        let engine = new Engine();
        engine.familyClass = FamilyMock;
        let system1 = new SystemMock();
        engine.addSystem(system1, 10);
        let system2 = new SystemMock2();
        engine.addSystem(system2, 5);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    .run({'async': true});
