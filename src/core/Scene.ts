/// <reference path="../../typings/tsd.d.ts" />

import {LinkedList} from '../utils/LinkedList';
import {Dictionary} from '../utils/Dictionary';
import {Entity} from './Entity';
const MiniSignal = require('mini-signals');

export class Scene {

    private static nameCount = 0;
    /**
     * Optional, give the scene a name. This can help with debugging and with serialising the scenes.
     */
    private _name:string;

    /**
     * This signal is dispatched when a entity is added to the scene.
     */
    public entityAdded;

    /**
     * This signal is dispatched when a entity is removed from the scene.
     */
    public entityRemoved;

    /**
     * Dispatched when the name of the scene changes.
     * Used internally by the engine to track entities based on their names.
     */
    public nameChanged;

    public previous:Scene;
    public next:Scene;

    private _entities:Dictionary;
    private _entityList:LinkedList;
    private _entityNames:Dictionary;

    constructor(name:string = '') {
        this._entities = new Dictionary();
        this.entityAdded = new MiniSignal();
        this.entityRemoved = new MiniSignal();
        this._entityList = new LinkedList();
        this._entityNames = new Dictionary();
        this.nameChanged = new MiniSignal();

        if (name) {
            this._name = name;
        } else {
            this._name = '_scene' + (++Scene.nameCount);
        }
    }

    /**
     * All scenes have a name. If no name is set, a default name is used. Names are used to
     * fetch specific scenes from the engine, and can also help to identify an entity when debugging.
     */
    public get name():string {
        return this._name;
    }
    public set name(value:string) {
        if(this._name !== value) {
            var previous:string = this._name;
            this._name = value;
            this.nameChanged.dispatch(this, previous);
        }
    }

    /**
     * Add a entity to the scene.
     *
     * @param entity The entity object to add.
     * @param entityClass The class of the entity. This is only necessary if the entity
     * extends another entity class and you want the framework to treat the entity as of
     * the base class type. If not set, the class type is determined directly from the entity.
     *
     * @return A reference to the scene. This enables the chaining of calls to add, to make
     * creating and configuring entities cleaner. e.g.
     *
     */
    public addEntity(entity:any, entityClass?):Scene {
        if (typeof entityClass === 'undefined') {
            entityClass = entity.constructor;
        }
        this._entityList.add(entity);
        this._entityNames.add(entity.name, entity);
        this.entityAdded.dispatch(this, entityClass);
        entity.scene = this;
        return this;
    }

    /**
     * Remove a entity from the scene.
     *
     * @param entityClass The class of the entity to be removed.
     * @return the entity, or null if the entity doesn't exist in the entity
     */
    public removeEntity(entity:Entity, index?:number):void {
        if(typeof index === 'undefined') {
            for (let i = 0; i < this._entityList.size(); i++) {
                if(this._entityList.item(i) === entity) {
                    this._entityList.remove(i);
                }
            }
        } else {
            this._entityList.remove(index);
        }
    }

    /**
     * Get a entity from the scene.
     *
     * @param entityName The class of the entity requested.
     * @return The entity, or null if none was found.
     */
    public getEntityWithName(entityName:any):Entity {
        for (let i = 0; i < this._entityList.size(); i++) {
            if (this._entityList.item(i).name === entityName) {
                return this._entityList.item(i);
            }
        }
    }

    /**
     * Get all entities from the scene.
     *
     * @return An array containing all the entities that are on the scene.
     */
    public getAllEntities():any[] {
        return this._entityList.toArray();
    }

    /**
     * Does the entity have a entity of a particular type.
     *
     * @param entityName The class of the entity sought.
     * @return true if the entity has a entity of the type, false if not.
     */
    public hasEntityWithName(entityName:any):boolean {
        for (let i = 0, len = this._entityList.size(); i < len; i++) {
            if(this._entityList.item(i).name === entityName) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks the type, if the prototype is matching.
     *
     * @return {boolean} Return if the prototypes match.
     */
    public is(type):boolean {
        return type.prototype.isPrototypeOf(this);
    }
}