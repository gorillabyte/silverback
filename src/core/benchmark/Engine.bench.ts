import {Engine} from '../Engine';
import {Entity} from '../Entity';

suite('Engine benchmarks', function(){
    var engine;

    set('iterations', 10);

    before(function() {
        engine = new Engine();
    });

    bench('Add an entity', function(){
        var entity1:Entity = new Entity();
        engine.addEntity(entity1);
    });

    bench('Add another entity', function(){
        var entity2:Entity = new Entity();
        engine.addEntity(entity2);
    });
});
