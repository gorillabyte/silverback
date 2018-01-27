/**
 * This export class maintains a pool of deleted nodes for reuse by the framework. This reduces the overhead
 * from object creation and garbage collection.
 *
 * Because nodes may be deleted from a NodeList while in use, by deleting Nodes from a NodeList
 * while iterating through the NodeList, the pool also maintains a cache of nodes that are added to the pool
 * but should not be reused yet. They are then released into the pool by calling the releaseCache method.
 */
export class NodePool {
    private tail: any;
    private nodeClass;
    private cacheTail: any;
    private components: Map<any, any>;

    /**
     * Creates a pool for the given node class.
     */
    constructor(nodeClass, components: Map<any, any>) {
        this.nodeClass = nodeClass;
        this.components = components;
    }

    /**
     * Fetches a node from the pool.
     */
    public get() {
        if (this.tail) {
            const node = this.tail;
            this.tail = this.tail.previous;
            node.previous = null;
            return node;
        } else {
            return Object.create(this.nodeClass);
        }
    }

    /**
     * Adds a node to the pool.
     */
    public dispose(node: any): void {
        node.entity = null;
        node.next = null;
        node.previous = this.tail;
        this.tail = node;
    }

    /**
     * Adds a node to the cache
     */
    public cache(node): void {
        node.previous = this.cacheTail;
        this.cacheTail = node;
    }

    /**
     * Releases all nodes from the cache into the pool
     */
    public releaseCache(): void {
        while (this.cacheTail) {
            const node: any = this.cacheTail;
            this.cacheTail = node.previous;
            this.dispose(node);
        }
    }
}
