import { Entity } from './Entity';
// tslint:disable-next-line
const MiniSignal = require('mini-signals');

export class Scene {
    private static nameCount = 0;
    /**
     * Optional, give the scene a name. This can help with debugging and with serialising the scenes.
     */
    private _name: string;
    private entityList: Map<string, Entity>;

    constructor(name = '') {
        this.entityAdded = new MiniSignal();
        this.entityRemoved = new MiniSignal();
        this.entityList = new Map();
        this.nameChanged = new MiniSignal();

        this._name = name ? name : '_scene' + ++Scene.nameCount;
    }

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

    public previous: Scene;
    public next: Scene;

    /**
     * All scenes have a name. If no name is set, a default name is used. Names are used to
     * fetch specific scenes from the engine, and can also help to identify an entity when debugging.
     */
    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        if (this._name !== value) {
            const previous: string = this._name;
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
    public addEntity(entity: any, entityClass?): Scene {
        if (typeof entityClass === 'undefined') {
            entityClass = entity.constructor;
        }
        this.entityList.set(entity.name, entity);
        this.entityAdded.dispatch(this, entityClass);
        entity.scene = this;
        return this;
    }

    /**
     * Remove a entity from the scene.
     *
     * @param entity The entity to be removed.
     */
    public removeEntity(entity: Entity): void {
        if(this.entityList.has(entity.name)) {
            this.entityList.delete(entity.name);
        }
    }

    /**
     * Get a entity from the scene.
     *
     * @param entityName The class of the entity requested.
     * @return The entity, or null if none was found.
     */
    public getEntityWithName(entityName: any): Entity {
        if(this.entityList.has(entityName)) {
            return this.entityList.get(entityName);
        } else {
            return null;
        }
    }

    /**
     * Get all entities from the scene.
     *
     * @return An array containing all the entities that are on the scene.
     */
    public getAllEntities(): Entity[] {
        return [...this.entityList.values()] as any;
    }

    /**
     * Does the entity have a entity of a particular type.
     *
     * @param entityName The class of the entity sought.
     * @return true if the entity has a entity of the type, false if not.
     */
    public hasEntityWithName(entityName: any): boolean {
        return this.entityList.has(entityName);
    }

    /**
     * Checks the type, if the prototype is matching.
     *
     * @return {boolean} Return if the prototypes match.
     */
    public is(type): boolean {
        return type.prototype.isPrototypeOf(this);
    }
}
