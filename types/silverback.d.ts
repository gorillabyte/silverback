// Type definitions for Silverback Game Engine 0.0.5
// Project: http://www.gorillabyte.com

interface Window {
    Silverback: any;
}
//declare const Silverback: any;

declare module Silverback {

    export function systemSort(items: any, left?: any, right?: any): any;

    export class LinkedList {
        private _head;
        private _tail;
        private _length;
        add(data: any): void;
        item(index: number): any;
        remove(index: number): any;
        size(): number;
        toArray(): any[];
        toString(): string;
        first: any;
        last: any;
        get(type: any): any;
    }

    export interface IFamily {
        nodeList: LinkedList;
        newEntity(entity: Entity): any;
        removeEntity(entity: Entity): any;
        componentAddedToEntity(entity: Entity, componentClass: () => any): any;
        componentRemovedFromEntity(entity: Entity, componentClass: () => any): any;
        cleanUp(): any;
    }

    export class ComponentsFamily implements IFamily {
        private _nodes;
        private _entities;
        private _nodeClass;
        private _components;
        private _nodePool;
        private _engine;
        constructor(nodeClass: any, engine: Engine);
        private _init();
        nodeList: LinkedList;
        newEntity(entity: Entity): void;
        componentAddedToEntity(entity: Entity, componentClass: () => any): void;
        componentRemovedFromEntity(entity: Entity, componentClass: () => any): void;
        removeEntity(entity: Entity): void;
        addIfMatch(entity: Entity): void;
        removeIfMatch(entity: Entity): void;
        private _releaseNodePoolCache();
        cleanUp(): void;
    }

    export class Node {
        entity:any;
        previous:any;
        next:any;
    }

    export class NodePool {
        private _tail;
        private _nodeClass;
        private _cacheTail;
        private _components;
        constructor(nodeClass: any, components: Map<any, any>);
        get(): any;
        dispose(node:any):void;
        cache(node:any):void;
        releaseCache():void;
    }

    export abstract class System {
        previous: System;
        next: System;
        priority: number;
        addToEngine(engine: any): void;
        removeFromEngine(engine: any): void;
        update(time: number): void;
        is(type: any): any;
    }

    export class Scene {
        private static nameCount;
        private _name;
        entityAdded: any;
        entityRemoved: any;
        nameChanged: any;
        previous: Scene;
        next: Scene;
        private _entities;
        private _entityList;
        private _entityNames;
        constructor(name?: string);
        name: string;
        addEntity(entity: any, entityClass?: any): Scene;
        removeEntity(entity: Entity, index?: number): void;
        getEntityWithName(entityName: any): Entity;
        getAllEntities(): any[];
        hasEntityWithName(entityName: any): boolean;
        is(type: any): boolean;
    }

    export class Entity {
        private static nameCount;
        private _name;
        componentAdded: any;
        componentRemoved: any;
        nameChanged: any;
        previous: Entity;
        next: Entity;
        private _components;
        private _addedToScene;
        constructor(name?: string);
        name: string;
        addComponent(component: any, componentClass?: any): Entity;
        removeComponent(componentClass: any): any;
        getComponent(componentClass: string): any;
        hasComponent(componentClass: string): boolean;
        getAll(): any[];
        scene: Scene;
        toString(): string;
    }

    export class Engine {
        private _systemList;
        private _entityList;
        private _sceneList;
        private _entityNames;
        private _sceneNames;
        private _families;
        updating:boolean;
        updateComplete:MiniSignal;
        familyClass:any;
        constructor();
        entities:Array<Entity>;
        scenes:Array<Scene>;
        systems:Array<System>;
        addEntity(entity:Entity):void;
        removeEntity(entity:Entity, index?:number):void;
        getEntityByName(name:string):Entity;
        removeAllEntities():void;
        addScene(scene:Scene):void;
        removeScene(scene:Scene, index?:number):void;
        removeAllScenes():void;
        getSceneByName(name:string):Scene;
        getScene(type:any):Scene;
        getNodeList(nodeClass:any):Set<any>;
        releaseNodeList(nodeClass:any):void;
        addSystem(system:System, priority?:number):void;
        getSystem(type:any):System;
        removeSystem(system:System, index?:number):void;
        removeAllSystems():void;
        update(time:number):void;
        private _entityNameChanged(entity, oldName);
        private _sceneNameChanged(scene, oldName);
        private _componentAdded(entity, componentClass);
        private _componentRemoved(entity, componentClass);
    }
}
