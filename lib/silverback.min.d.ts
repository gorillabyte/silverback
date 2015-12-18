/// <reference path="../SBE/typings/tsd.d.ts" />
declare module silverback.utils {
    interface IDictionary {
    }
    class Dictionary implements IDictionary {
        private _keys;
        private _values;
        constructor();
        add(key: any, value: any): void;
        remove(key: any): any;
        getValue(key: any): any;
        getIndex(testKey: any): number;
        has(testKey: any): boolean;
        values(): any[];
        forEach(action: any): boolean;
    }
}
declare module silverback.utils {
    class Signal {
        private _bindings;
        private _prevParams;
        static VERSION: string;
        memorize: boolean;
        private _shouldPropagate;
        active: boolean;
        validateListener(listener: any, fnName: any): void;
        private _registerListener(listener, isOnce, listenerContext, priority);
        private _addBinding(binding);
        private _indexOfListener(listener, context);
        has(listener: any, context?: any): boolean;
        add(listener: any, listenerContext?: any, priority?: number): SignalBinding;
        addOnce(listener: any, listenerContext?: any, priority?: number): SignalBinding;
        remove(listener: any, context?: any): any;
        removeAll(): void;
        getNumListeners(): number;
        halt(): void;
        dispatch(...paramsArr: any[]): void;
        forget(): void;
        dispose(): void;
        toString(): string;
    }
}
declare module silverback.utils {
    class SignalBinding {
        constructor(signal: Signal, listener: any, isOnce: boolean, listenerContext: any, priority?: number);
        private _listener;
        private _isOnce;
        context: any;
        private _signal;
        priority: number;
        active: boolean;
        params: any;
        execute(paramsArr?: any[]): any;
        detach(): any;
        isBound(): boolean;
        isOnce(): boolean;
        getListener(): any;
        getSignal(): Signal;
        _destroy(): void;
        toString(): string;
    }
}
declare module silverback.core {
    class Entity {
        private static nameCount;
        name: string;
        componentAdded: silverback.utils.Signal;
        componentRemoved: silverback.utils.Signal;
        previous: Entity;
        next: Entity;
        private _components;
        private _addedToScene;
        constructor(name?: string);
        add(component: any, componentClass?: any): Entity;
        remove(componentClass: any): any;
        get(componentClass: any): any;
        getAll(): any[];
        has(componentClass: any): boolean;
        scene: silverback.core.Scene;
    }
}
declare module silverback.core {
    class EntityList {
        head: silverback.core.Entity;
        tail: silverback.core.Entity;
        add(entity: silverback.core.Entity): void;
        remove(entity: silverback.core.Entity): void;
        private _removeAll();
    }
}
declare module silverback.core {
    class Scene {
        private static nameCount;
        private _name;
        entityAdded: silverback.utils.Signal;
        entityRemoved: silverback.utils.Signal;
        previous: Scene;
        next: Scene;
        private _entities;
        private _entityList;
        constructor(name?: string);
        addEntity(entity: any, entityClass?: any): Scene;
        removeEntity(entity: any): any;
        getEntityWithName(entityName: any): any;
        getEntityWithComponent(_component: any, _componentClass: any): any;
        getAllEntity(): any[];
        hasEntity(entityClass: any): boolean;
        is(type: any): any;
    }
}
declare module silverback.core {
    class SceneList {
        head: silverback.core.Scene;
        tail: silverback.core.Scene;
        add(scene: silverback.core.Scene): void;
        remove(scene: silverback.core.Scene): void;
        private _removeAll();
        get(type: any): silverback.core.Scene;
    }
}
declare module silverback.core {
    class Node {
        entity: silverback.core.Entity;
        previous: any;
        next: any;
    }
}
declare module silverback.core {
    class NodeList {
        head: any;
        tail: any;
        nodeAdded: silverback.utils.Signal;
        nodeRemoved: silverback.utils.Signal;
        constructor();
        add(node: silverback.core.Node): void;
        remove(node: silverback.core.Node): void;
        removeAll(): void;
        empty(): boolean;
        swap(node1: silverback.core.Node, node2: silverback.core.Node): void;
        insertionSort(sortFunction: any): void;
        mergeSort(sortFunction: any): void;
        private _merge(head1, head2, sortFunction);
    }
}
declare module silverback.core {
    class NodePool {
        private _tail;
        private _nodeClass;
        private _cacheTail;
        private _components;
        constructor(nodeClass: any, components: any);
        get(): any;
        dispose(node: silverback.core.Node): void;
        cache(node: silverback.core.Node): void;
        releaseCache(): void;
    }
}
declare module silverback.core {
    interface IFamily {
        nodeList: silverback.core.NodeList;
        newEntity(entity: silverback.core.Entity): any;
        removeEntity(entity: silverback.core.Entity): any;
        componentAddedToEntity(entity: silverback.core.Entity, componentClass: () => any): any;
        componentRemovedFromEntity(entity: silverback.core.Entity, componentClass: () => any): any;
        cleanUp(): any;
    }
}
declare module silverback.core {
    class Engine {
        private _entityList;
        private _sceneList;
        private _systemList;
        private _families;
        updating: boolean;
        updateComplete: utils.Signal;
        familyClass: typeof ComponentMatchingFamily;
        constructor();
        entites: any;
        scenes: any;
        systems: any;
        addEntity(entity: Entity): void;
        removeEntity(entity: Entity): void;
        removeAllEntities(): void;
        addScene(scene: silverback.core.Scene): void;
        removeScene(scene: Scene): void;
        removeAllScenes(): void;
        getScene(type: any): Scene;
        private _componentAdded(entity, componentClass);
        private _componentRemoved(entity, componentClass);
        getNodeList(nodeClass: any): NodeList;
        releaseNodeList(nodeClass: any): void;
        addSystem(system: System, priority: number): void;
        getSystem(type: any): System;
        removeSystem(system: System): void;
        removeAllSystems(): void;
        update(time: number): void;
    }
}
declare module silverback.core {
    class System {
        previous: System;
        next: System;
        priority: number;
        constructor();
        addToEngine(engine: any): void;
        removeFromEngine(engine: any): void;
        update(time: number): void;
        is(type: any): any;
    }
}
declare module silverback.core {
    class ComponentMatchingFamily implements silverback.core.IFamily {
        private _nodes;
        private _entities;
        private _nodeClass;
        private _components;
        private _nodePool;
        private _engine;
        constructor(nodeClass: any, engine: silverback.core.Engine);
        nodeList: silverback.core.NodeList;
        newEntity(entity: silverback.core.Entity): void;
        componentAddedToEntity(entity: silverback.core.Entity, componentClass: () => any): void;
        componentRemovedFromEntity(entity: silverback.core.Entity, componentClass: () => any): void;
        removeEntity(entity: silverback.core.Entity): void;
        addIfMatch(entity: silverback.core.Entity): void;
        removeIfMatch(entity: silverback.core.Entity): void;
        private _releaseNodePoolCache();
        cleanUp(): void;
    }
}
declare module silverback.core {
    class SystemList {
        head: silverback.core.System;
        tail: silverback.core.System;
        add(system: silverback.core.System): void;
        remove(system: silverback.core.System): void;
        removeAll(): void;
        get(type: any): silverback.core.System;
    }
}
