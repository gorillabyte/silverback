/// <reference path="../../typings/tsd.d.ts" />

module silverback.core {
	/**
	 * This export class maintains a pool of deleted nodes for reuse by the framework. This reduces the overhead
	 * from object creation and garbage collection.
	 * 
	 * Because nodes may be deleted from a NodeList while in use, by deleting Nodes from a NodeList
	 * while iterating through the NodeList, the pool also maintains a cache of nodes that are added to the pool
	 * but should not be reused yet. They are then released into the pool by calling the releaseCache method.
	 */
	export class NodePool {
	    private _tail: silverback.core.Node;
		private _nodeClass;
		private _cacheTail: silverback.core.Node;
        private _components;

        /**
		 * Creates a pool for the given node class.
		 */
		constructor(nodeClass, components) {
			this._nodeClass = nodeClass;
            this._components = components;
        }

		/**
		 * Fetches a node from the pool.
		 */
        public get() {
            if( this._tail ) {
                var node = this._tail;
                this._tail = this._tail.previous;
                node.previous = null;
                return node;
            } else {
                var newNode = new this._nodeClass;
                return newNode;
            }
        }

		/**
		 * Adds a node to the pool.
		 */
		public dispose(node: silverback.core.Node ) {
            this._components.forEach(function(componentClass, componentName) {
                node[componentName] = null;
            });
            node.entity = null;
            node.next = null;
			node.previous = this._tail;
			this._tail = node;
		}
		
		/**
		 * Adds a node to the cache
		 */
		public cache(node: silverback.core.Node) {
			node.previous = this._cacheTail;
			this._cacheTail = node;
		}
		
		/**
		 * Releases all nodes from the cache into the pool
		 */
		public releaseCache() {
		    while (this._cacheTail ) {
		        var node: silverback.core.Node = this._cacheTail;
		        this._cacheTail = node.previous;
				node.next = null;
				node.previous = this._tail;
				this._tail = node;
			}
		}
	}
}
