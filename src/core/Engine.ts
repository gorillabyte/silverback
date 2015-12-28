/**
 * @module Silverback
 * @class Engine
 */

/// <reference path="../../typings/tsd.d.ts" />

import {Entity} from './Entity';
import {Scene} from './Scene';
import {NodeList} from './NodeList';
import {Dictionary} from '../utils/Dictionary';
import {LinkedList} from '../utils/LinkedList';
import {System} from './System';
import {ComponentsFamily} from './ComponentsFamily';
import {IFamily} from './IFamily';

const MiniSignal = require('../../node_modules/mini-signals');

/**
 * The Engine class is the central point for creating and managing your game state. Add
 * entities and systems to the engine, and fetch families of nodes from the engine.
 */
export class Engine {

    private _systemList:LinkedList;
    private _entityList:LinkedList;
    private _sceneList:LinkedList;
    private _entityNames:Dictionary;
    private _sceneNames:Dictionary;
    private _families:Dictionary;

    /**
     * Indicates if the engine is currently in its update loop.
     */
    public updating:boolean;

    /**
     * Dispatched when the update loop ends. If you want to add and remove systems from the
     * engine it is usually best not to do so during the update loop. To avoid this you can
     * listen for this signal and make the change when the signal is dispatched.
     */
    public updateComplete:MiniSignal;

    /**
     * The class used to manage node lists. In most cases the default class is sufficient
     * but it is exposed here so advanced developers can choose to create and use a
     * different implementation.
     *
     * The class must implement the Family interface.
     */
    public familyClass = null;

    constructor() {
        this._systemList = new LinkedList();
        this._entityList = new LinkedList();
        this._sceneList = new LinkedList();
        this._entityNames = new Dictionary();
        this._sceneNames = new Dictionary();
        this._families = new Dictionary();
        this.updateComplete = new MiniSignal();

        this.familyClass = ComponentsFamily;
    }

    /**
     * Returns an array containing all the entities in the engine.
     */
    public get entities():Array<Entity> {
        return this._entityList.toArray();
    }

    /**
     * Returns an array containing all the scenes in the engine.
     */
    public get scenes():Array<Scene> {
        return this._sceneList.toArray();
    }

    /**
     * Returns an array containing all the systems in the engine.
     */
    public get systems():Array<System> {
        return this._systemList.toArray();
    }

    /**
     * Add an entity to the engine.
     *
     * @param entity The entity to add.
     */
    public addEntity(entity:Entity):void {
        if(this._entityNames.has(entity.name)) {
            throw new Error('The entity name ' + entity.name + ' is already in use by another entity.');
        }
        this._entityList.add(entity);
        this._entityNames.add(entity.name, entity);
        entity.componentAdded.add(this._componentAdded, this);
        entity.componentRemoved.add(this._componentRemoved, this);
        entity.nameChanged.add(this._entityNameChanged, this);

        this._families.forEach((nodeObject, family:IFamily) => {
                family.newEntity(entity);
            }
        );
    }

    /**
     * Remove an entity from the engine.
     *
     * @param entity The entity to remove.
     * @param index The index of the entity list.
     */
    public removeEntity(entity: Entity, index?:number):void {
        /*entity.componentAdded.remove(this._componentAdded, this);
        entity.componentRemoved.remove(this._componentRemoved, this);
        entity.nameChanged.remove(this._entityNameChanged, this);*/
        entity.componentAdded.detachAll();
        entity.componentRemoved.detachAll();
        entity.nameChanged.detachAll();

        this._families.forEach((nodeObject, family: IFamily) => {
                family.removeEntity(entity);
            }
        );
        this._entityNames.remove(entity.name);
        this._entityList.remove(index);
    }

    /**
     * Get an entity based on its name.
     *
     * @param name The name of the entity
     * @return The entity, or null if no entity with that name exists on the engine
     */
    public getEntityByName(name:string):Entity {
        if(this._entityNames.has(name)) {
            return this._entityNames.getValue(name);
        }
        return null;
    }

    /**
     * Remove all entities from the engine.
     */
    public removeAllEntities():void {
        let listSize = this._entityList.size() - 1;
        for (let i = listSize; i >= 0; i--) {
            this.removeEntity(this._entityList.item(i), i);
        }
    }

    /**
     * Add an scene to the engine.
     *
     * @param scene The scene to add.
     */
    public addScene(scene:Scene):void {
        this._sceneList.add(scene);
        this._sceneNames.add(scene.name, scene);
        scene.nameChanged.add(this._sceneNameChanged, this);

    }

    /**
     * Remove an scene from the engine.
     *
     * @param scene The scene to remove.
     * @param index The scene index in the sceneList
     */
    public removeScene(scene:Scene, index?:number):void {
        if(typeof index === 'undefined') {
            for (let i = 0; i < this._sceneList.size(); i++) {
                if(this._sceneList.item(i) === scene) {
                    this._sceneList.remove(i);
                }
            }
        } else {
            this._sceneList.remove(index);
        }
        this._sceneNames.remove(scene.name);
        scene.nameChanged.detachAll();
    }

    /**
     * Remove all scenes from the engine.
     */
    public removeAllScenes():void {
        let listSize = this._sceneList.size() - 1;
        for (let i = listSize; i >= 0; i--) {
            this.removeScene(this._sceneList.item(i), i);
        }
    }

    /**
     * Get an scene based on its name.
     *
     * @param name The name of the scene
     * @return The scene, or null if no scene with that name exists on the engine
     */
    public getSceneByName(name:string):Scene {
        if(this._sceneNames.has(name)) {
            return this._sceneNames.getValue(name);
        }
        return null;
    }

    /**
     * Get the scene instance of a particular type from within the engine.
     *
     * @param type The type of scene
     * @return The instance of the scene type that is in the engine, or
     * null if no scene of this type are in the engine.
     */
    public getScene(type):Scene {
        return this._sceneList.get(type);
    }

    /**
     * Get a collection of nodes from the engine, based on the type of the node required.
     *
     * <p>The engine will create the appropriate NodeList if it doesn't already exist and
     * will keep its contents up to date as entities are added to and removed from the
     * engine.</p>
     *
     * <p>If a NodeList is no longer required, release it with the releaseNodeList method.</p>
     *
     * @param nodeClass The type of node required.
     * @return A linked list of all nodes of this type from all entities in the engine.
     */
    public getNodeList(nodeClass):NodeList {
        if(this._families.has(nodeClass)) {
            return this._families.getValue(nodeClass)._nodes;
        } else {
            let family:IFamily = new this.familyClass(nodeClass, this);
            this._families.add(nodeClass, family);
            for (let i = 0; i < this._entityList.size(); i++) {
                family.newEntity(this._entityList.item(i));
            }
            return family.nodeList;
        }
    }

    /**
     * If a NodeList is no longer required, this method will stop the engine updating
     * the list and will release all references to the list within the framework
     * classes, enabling it to be garbage collected.
     *
     * <p>It is not essential to release a list, but releasing it will free
     * up memory and processor resources.</p>
     *
     * @param nodeClass The type of the node class if the list to be released.
     */
    public releaseNodeList(nodeClass) {
        if(this._families.has(nodeClass)) {
            this._families.getValue(nodeClass).cleanUp();
        } else {
            throw new Error('The given nodeClass was not found and can not be released.');
        }
        this._families.remove(nodeClass);
    }

    /**
     * Add a system to the engine, and set its priority for the order in which the
     * systems are updated by the engine update loop.
     *
     * <p>The priority dictates the order in which the systems are updated by the engine update
     * loop. Lower numbers for priority are updated first. i.e. a priority of 1 is
     * updated before a priority of 2.</p>
     *
     * @param system The system to add to the engine.
     * @param priority The priority for updating the systems during the engine loop. A
     * lower number means the system is updated sooner.
     */
    public addSystem(system:System, priority:number) {
        system.priority = priority;
        system.addToEngine(this);
        this._systemList.add(system);
    }

    /**
     * Get the system instance of a particular type from within the engine.
     *
     * @param type The type of system
     * @return The instance of the system type that is in the engine, or
     * null if no systems of this type are in the engine.
     */
    public getSystem(type):System {
        return this._systemList.get(type);
    }

    /**
     * Remove a system from the engine.
     *
     * @param system The system to remove from the engine.
     * @param index The system index in the system list.
     */
    public removeSystem(system:System, index?:number) {
        if(typeof index === 'undefined') {
            for (let i = 0; i < this._systemList.size(); i++) {
                if(this._systemList.item(i) === system) {
                    this._systemList.remove(i);
                }
            }
        } else {
            this._systemList.remove(index);
        }
        system.removeFromEngine(this);
    }

    /**
     * Remove all systems from the engine.
     */
    public removeAllSystems():void {
        let listSize = this._systemList.size() - 1;
        for (let i = listSize; i >= 0; i--) {
            this.removeSystem(this._systemList.item(i), i);
        }
    }

    /**
     * Update the engine. This causes the engine update loop to run, calling update on all the
     * systems in the engine.
     *
     * @time The duration, in seconds, of this update step.
     */
    public update(time:number):void {
        this.updating = true;
        let systemSize = this._systemList.size();
        for (let i = 0; i < systemSize; i++) {
            this._systemList.item(i).update(time);
        }
        this.updating = false;
        this.updateComplete.dispatch();
    }

    /**
     * @private
     */
    private _entityNameChanged(entity:Entity, oldName:string):void {
        if(this._entityNames.has(oldName)) {
            this._entityNames.remove(oldName);
            this._entityNames.add(entity.name, entity);
        } else {
            throw new Error('The given name was not found in the entity list.');
        }
    }

    /**
     * @private
     */
    private _sceneNameChanged(scene:Scene, oldName:string):void {
        if(this._sceneNames.has(oldName)) {
            this._sceneNames.remove(oldName);
            this._sceneNames.add(scene.name, scene);
        } else {
            throw new Error('The given name was not found in the scene list.');
        }
    }

    /**
     * @private
     */
    private _componentAdded(entity:Entity, componentClass:() => any):void {
        this._families.forEach((nodeObject, family:IFamily) => {
                family.componentAddedToEntity(entity, componentClass);
            }
        );
    }

    /**
     * @private
     */
    private _componentRemoved(entity:Entity, componentClass:() => any):void {
        this._families.forEach((nodeObject, family:IFamily) => {
                family.componentRemovedFromEntity(entity, componentClass);
            }
        );
    }
}