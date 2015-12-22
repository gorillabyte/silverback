/// <reference path="../../typings/tsd.d.ts" />

/**
 * The default class for managing a NodeList. This class creates the NodeList and adds and removes
 * nodes to/from the list as the entities and the components in the engine change.
 *
 * It uses the basic entity matching pattern of an entity system - entities are added to the list if
 * they contain components matching all the public properties of the node class.
 */
import {Node} from './Node';
import {NodePool} from './NodePool';
import {NodeList} from './NodeList';
import {Engine} from './Engine';
import {Entity} from './Entity';
import {IFamily} from './IFamily';
import {Dictionary} from '../utils/Dictionary';

export class ComponentMatchingFamily implements IFamily {
    private _nodes:NodeList;
    private _entities:Dictionary;
    private _nodeClass;
    private _components:Dictionary;
    private _nodePool:NodePool;
    private _engine:Engine;

    /**
     * The constructor. Creates a ComponentMatchingFamily to provide a NodeList for the
     * given node class.
     *
     * @param nodeClass The type of node to create and manage a NodeList for.
     * @param engine The engine that this family is managing teh NodeList for.
     */
    constructor(nodeClass:any, engine:Engine) {
        this._nodeClass = nodeClass;
        this._engine = engine;

        this._nodes = new NodeList();
        this._entities = new Dictionary();
        this._components = new Dictionary();

        var nodeClassPrototype = this._nodeClass.prototype;

        for (var property in nodeClassPrototype) {
            ///TODO - tidy this up...
            if (nodeClassPrototype.hasOwnProperty(property) &&
                property !== 'types' &&
                property !== 'next' &&
                property !== 'previous' &&
                property !== 'constructor' &&
                property !== 'super' &&
                property !== 'extend' &&
                property !== 'entity') {
                var componentObject = nodeClassPrototype.types[property];
                this._components.add(componentObject, property);
            }
        }

        this._nodePool = new NodePool(this._nodeClass, this._components);
        this._nodePool.dispose(this._nodePool.get());
        /*this._nodeClass = nodeClass;
         this._engine = engine;

         this._nodePool = new silverback.core.NodePool(this._nodeClass);
         this._nodes = new silverback.core.NodeList();
         this._entities = new silverback.utils.Dictionary();

         this._components = new silverback.utils.Dictionary();
         this._nodePool.dispose(this._nodePool.get()); // create a dummy instance to ensure describeType works.

         var nodeClassPrototype = this._nodeClass.prototype;

         for (var property in nodeClassPrototype) {
         ///TODO - tidy this up...
         if (nodeClassPrototype.hasOwnProperty(property) &&
         property !== 'types' &&
         property !== 'next' &&
         property !== 'previous' &&
         property !== 'constructor' &&
         property !== 'super' &&
         property !== 'extend' &&
         property !== 'entity') {
         var componentObject = nodeClassPrototype.types[property];
         this._components.add(componentObject, property);
         }
         }

         this._init();*/
    }

    /**
     * Initialises the class. Creates the nodelist and other tools. Analyses the node to determine
     * what component types the node requires.
     */
    /*private _init()
     {
     }*/

    /**
     * The nodelist managed by this family. This is a reference that remains valid always
     * since it is retained and reused by Systems that use the list. i.e. we never recreate the list,
     * we always modify it in place.
     */
    public get nodeList():NodeList {
        return this._nodes;
    }

    /**
     * Called by the engine when an entity has been added to it. We check if the entity should be in
     * this family's NodeList and add it if appropriate.
     */
    public newEntity(entity:Entity) {
        this.addIfMatch(entity);
    }

    /**
     * Called by the engine when a component has been added to an entity. We check if the entity is not in
     * this family's NodeList and should be, and add it if appropriate.
     */
    public componentAddedToEntity(entity:Entity, componentClass:() => any) {
        this.addIfMatch(entity);
    }

    /**
     * Called by the engine when a component has been removed from an entity. We check if the removed component
     * is required by this family's NodeList and if so, we check if the entity is in this this NodeList and
     * remove it if so.
     */
    public componentRemovedFromEntity(entity:Entity, componentClass:() => any) {
        if (this._components.has(componentClass)) {
            this.removeIfMatch(entity);
        }
    }

    /**
     * Called by the engine when an entity has been rmoved from it. We check if the entity is in
     * this family's NodeList and remove it if so.
     */
    public removeEntity(entity:Entity) {
        this.removeIfMatch(entity);
    }

    /**
     * If the entity is not in this family's NodeList, tests the components of the entity to see
     * if it should be in this NodeList and adds it if so.
     */
    public addIfMatch(entity:Entity) {
        if (!this._entities.has(entity)) {
            var componentClass;
            if (
                !this._components.forEach(function (componentClass, componentName) {
                    if (!entity.has(componentClass)) {
                        return 'return';
                    }
                })
            ) {
                return;
            }
            var node = this._nodePool.get();
            node.entity = entity;
            this._components.forEach(function (componentClass, componentName) {
                node[componentName] = entity.get(componentClass);
            });
            this._entities.add(entity, node);
            entity.componentRemoved.add(this.componentRemovedFromEntity, this);
            this._nodes.add(node);
        }
        /*if (!this._entities.getValue(entity))
         {
         var componentClass : any;
         for (componentClass in this._components )
         {
         if ( !entity.has( componentClass ) )
         {
         return;
         }
         }
         var node: silverback.core.Node = this._nodePool.get();
         node.entity = entity;
         for (componentClass in this._components )
         {
         node[this._components[componentClass]] = entity.get( componentClass );
         }
         this._entities.add(entity, node);
         this._nodes.add( node );
         }*/
    }

    /**
     * Removes the entity if it is in this family's NodeList.
     */
    public removeIfMatch(entity:Entity) {
        if (this._entities.getValue(entity)) {
            var node:Node = this._entities.getValue(entity);
            this._entities.remove(entity);
            this._nodes.remove(node);
            if (this._engine.updating) {
                this._nodePool.cache(node);
                this._engine.updateComplete.add(this._releaseNodePoolCache, this);
            } else {
                this._nodePool.dispose(node);
            }
        }
    }

    /**
     * Releases the nodes that were added to the node pool during this engine update, so they can
     * be reused.
     */
    private _releaseNodePoolCache() {
        this._engine.updateComplete.detachAll();
        this._nodePool.releaseCache();
    }

    /**
     * Removes all nodes from the NodeList.
     */
    public cleanUp() {
        for (var node:Node = this._nodes.head; node; node = node.next) {
            this._entities.remove(node.entity);
        }
        this._nodes.removeAll();
    }
}