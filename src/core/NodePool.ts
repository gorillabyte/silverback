/**
 * This export class maintains a pool of deleted nodes for reuse by the framework. This reduces the overhead
 * from object creation and garbage collection.
 *
 * Because nodes may be deleted from a NodeList while in use, by deleting Nodes from a NodeList
 * while iterating through the NodeList, the pool also maintains a cache of nodes that are added to the pool
 * but should not be reused yet. They are then released into the pool by calling the releaseCache method.
 */
import { Dictionary } from '../utils/Dictionary';

export class NodePool {
    private _tail: any;
    private _nodeClass;
    private _cacheTail: any;
    private _components: Dictionary;

    /**
     * Creates a pool for the given node class.
     */
    constructor(nodeClass, components: Dictionary) {
        this._nodeClass = nodeClass;
        this._components = components;
    }

    /**
     * Fetches a node from the pool.
     */
    public get() {
        if (this._tail) {
            let node = this._tail;
            this._tail = this._tail.previous;
            node.previous = null;
            return node;
        } else {
            return Object.create(this._nodeClass);
        }
    }

    /**
     * Adds a node to the pool.
     */
    public dispose(node: any): void {
        node.entity = null;
        node.next = null;
        node.previous = this._tail;
        this._tail = node;
    }

    /**
     * Adds a node to the cache
     */
    public cache(node): void {
        node.previous = this._cacheTail;
        this._cacheTail = node;
    }

    /**
     * Releases all nodes from the cache into the pool
     */
    public releaseCache(): void {
        while (this._cacheTail) {
            let node: any = this._cacheTail;
            this._cacheTail = node.previous;
            this.dispose(node);
        }
    }
}
