/// <reference path="../../typings/tsd.d.ts" />

import {EntityList} from './EntityList';
import {Dictionary} from '../utils/Dictionary';
import {Signal} from '../utils/Signal';

export class Scene {

    private static nameCount = 0;
    /**
     * Optional, give the entity a name. This can help with debugging and with serialising the entity.
     */
    private _name:string;
    /**
     * This signal is dispatched when a entity is added to the entity.
     */
    public entityAdded:Signal;
    /**
     * This signal is dispatched when a entity is removed from the entity.
     */
    public entityRemoved:Signal;

    public previous:Scene;
    public next:Scene;

    private _entities:Dictionary;
    private _entityList:EntityList;

    constructor(name:string = '') {
        this._entities = new Dictionary();
        this.entityAdded = new Signal();
        this.entityRemoved = new Signal();
        this._entityList = new EntityList();

        if (name) {
            this._name = name;
        } else {
            this._name = '_scene' + (++Scene.nameCount);
        }
    }

    /**
     * Add a entity to the entity.
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
        /*
         if ( this._entities.has( entityClass ) ) {
         this.removeEntity( entityClass );
         }*/
        this._entityList.add(entity);
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
    public removeEntity(entity):any {
        this._entityList.remove(entity);

        /*var entity:any = this._entities.getValue(entityClass);
         if (entity) {
         this._entities.remove( entityClass );
         this.entityRemoved.dispatch(this, entityClass);
         return entity;
         }
         return null;*/
    }

    /**
     * Get a entity from the scene.
     *
     * @param entityName The class of the entity requested.
     * @return The entity, or null if none was found.
     */
    public getEntityWithName(entityName:any):any {
        //return this._entities.getValue(entityClass);
        for (var entity:any = this._entityList.head; entity; entity = entity.next) {
            if (entity.name === entityName) {
                return entity;
            }
        }
    }

    /**
     * Get a entity with component from the scene.
     *
     * @param entityClass The class of the entity requested.
     * @return The entity, or null if none was found.
     */
    public getEntityWithComponent(_component:any, _componentClass:any):any {

        for (var entity:any = this._entityList.head; entity; entity = entity.next) {
            if (entity.has(_componentClass)) {
                if (entity.get(_componentClass).displayObject === _component) {
                    return entity;
                }
            }
        }
        return null;
    }

    /**
     * Get all entities from the scene.
     *
     * @return An array containing all the entities that are on the entity.
     */
    public getAllEntity():any[] {
        var entityArray = [];

        this._entities.forEach(
            (entityClass, entity) => {
                entityArray.push(entity);
            }
        );
        return entityArray;
    }

    /**
     * Does the entity have a entity of a particular type.
     *
     * @param entityClass The class of the entity sought.
     * @return true if the entity has a entity of the type, false if not.
     */
    public hasEntity(entityClass:any):boolean {
        return this._entities.has(entityClass);
    }

    public is(type) {
        return type.prototype.isPrototypeOf(this);
    }
}