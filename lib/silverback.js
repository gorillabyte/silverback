module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Dictionary = /** @class */function () {
    function Dictionary() {
        this._keys = [];
        this._values = [];
    }
    Dictionary.prototype.add = function (key, value) {
        var keyIndex = this.getIndex(key);
        if (keyIndex >= 0) {
            this._values[keyIndex] = value;
        } else {
            this._keys.push(key);
            this._values.push(value);
        }
    };
    Dictionary.prototype.remove = function (key) {
        var keyIndex = this.getIndex(key);
        if (keyIndex >= 0) {
            var removedValue = this._values[keyIndex];
            this._keys.splice(keyIndex, 1);
            this._values.splice(keyIndex, 1);
            return removedValue;
        } else {
            throw 'Key does not exist';
        }
    };
    Dictionary.prototype.getValue = function (key) {
        var value = null;
        var keyIndex = this.getIndex(key);
        if (keyIndex >= 0) {
            value = this._values[keyIndex];
        }
        return value;
    };
    Dictionary.prototype.getIndex = function (testKey) {
        var len = this._keys.length;
        var key;
        for (var i = 0; i < len; ++i) {
            key = this._keys[i];
            if (key === testKey) {
                return i;
            }
        }
        return -1;
    };
    Dictionary.prototype.has = function (testKey) {
        var len = this._keys.length;
        var key;
        for (var i = 0; i < len; ++i) {
            key = this._keys[i];
            if (key === testKey) {
                return true;
            }
        }
        return false;
    };
    Dictionary.prototype.values = function () {
        var len = this._keys.length;
        var key;
        var value;
        var arValue = [];
        for (var i = 0; i < len; ++i) {
            key = this._keys[i];
            value = this._values[i];
            arValue.push(value);
        }
        return arValue;
    };
    Dictionary.prototype.forEach = function (action) {
        var len = this._keys.length;
        var key;
        var value;
        for (var i = 0; i < len; ++i) {
            key = this._keys[i];
            value = this._values[i];
            var breakHere = action(key, value);
            if (breakHere === 'return') {
                return false;
            }
        }
        return true;
    };
    return Dictionary;
}();
exports.Dictionary = Dictionary;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *  Linked List implementation in JavaScript, Released under the MIT license
 *  https://github.com/nzakas/computer-science-in-javascript/
 *
 *  @author     Stefan Herndlbauer, 2015, TypeScript conversion
 *  @author     Nicholas C. Zakas, 2009, Doubly Linked List
 *
 *  @url        http://www.gorillabyte.com
 */

Object.defineProperty(exports, "__esModule", { value: true });
var LinkedList = /** @class */function () {
    function LinkedList() {
        /**
         * Pointer to first item in the list.
         * @property _head
         * @type Object
         * @private
         */
        this._head = null;
        /**
         * Pointer to last item in the list.
         * @property _tail
         * @type Object
         * @private
         */
        this._tail = null;
        /**
         * The number of items in the list.
         * @property _length
         * @type number
         * @private
         */
        this._length = 0;
    }
    /**
     * Appends some data to the end of the list. This method traverses
     * the existing list and places the value at the end in a new item.
     * @param {any} data The data to add to the list.
     * @return {Void}
     * @method add
     */
    LinkedList.prototype.add = function (data) {
        // Create a new item object, place data in
        var node = {
            data: data,
            next: null,
            previous: null
        };
        // Special case: no items in the list yet
        if (this._length === 0) {
            this._head = node;
            this._tail = node;
            // If node has next and previous properties
            if (typeof data.next !== 'undefined') {
                data.next = data.previous = null;
            }
        } else {
            // Attach to the tail node
            this._tail.next = node;
            node.previous = this._tail;
            node.next = null;
            this._tail = node;
        }
        // Don't forget to update the count
        this._length++;
    };
    /**
     * Retrieves the data in the given position in the list.
     * @param {number} index The zero-based index of the item whose value should be returned.
     * @return {any} The value in the "data" portion of the given item or null if the item doesn't exist.
     * @method item
     */
    LinkedList.prototype.item = function (index) {
        //check for out-of-bounds values
        if (index > -1 && index < this._length) {
            var current = this._head,
                i = 0;
            while (i++ < index) {
                current = current.next;
            }
            return current.data;
        } else {
            return null;
        }
    };
    /**
     * Removes the item from the given location in the list.
     * @param {int} index The zero-based index of the item to remove.
     * @return {any} The data in the given position in the list or null if
     *      the item doesn't exist.
     * @method remove
     */
    LinkedList.prototype.remove = function (index) {
        // Check for out-of-bounds values
        if (index > -1 && index < this._length) {
            var current = this._head;
            var i = 0;
            // Special case: removing first item
            if (index === 0) {
                this._head = current.next;
                /*
                 * If there's only one item in the list and you remove it,
                 * then this._head will be null. In that case, you should
                 * also set this._tail to be null to effectively destroy
                 * the list. Otherwise, set the previous pointer on the new
                 * this._head to be null.
                 */
                if (!this._head) {
                    this._tail = null;
                } else {
                    this._head.previous = null;
                }
                //special case: removing last item
            } else if (index === this._length - 1) {
                current = this._tail;
                this._tail = current.previous;
                this._tail.next = null;
            } else {
                //find the right location
                while (i++ < index) {
                    current = current.next;
                }
                //skip over the item to remove
                current.previous.next = current.next;
                current.next.previous = current.previous;
            }
            // Decrement the length
            this._length--;
            // Return the value
            return current.data;
        } else {
            return null;
        }
    };
    /**
     * Returns the number of items in the list.
     * @return {int} The number of items in the list.
     * @method size
     */
    LinkedList.prototype.size = function () {
        return this._length;
    };
    /**
     * Converts the list into an array.
     * @return {Array} An array containing all of the data in the list.
     * @method toArray
     */
    LinkedList.prototype.toArray = function () {
        var result = [];
        var current = this._head;
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    };
    /**
     * Converts the list into a string representation.
     * @return {String} A string representation of the list.
     * @method toString
     */
    LinkedList.prototype.toString = function () {
        return this.toArray().toString();
    };
    Object.defineProperty(LinkedList.prototype, "first", {
        /**
         * Returns the first element in this list.
         * @return {any} The first element of the list or undefined if the list is empty.
         */
        get: function get() {
            if (this._head !== null) {
                return this._head.data;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkedList.prototype, "last", {
        /**
         * Returns the last element in this list.
         * @return {any} the last element in the list or undefined if the list is empty.
         */
        get: function get() {
            if (this._tail !== null) {
                return this._tail.data;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the a list element by its type.
     * @return {any} The element of the list or null if the item was not in the list.
     */
    LinkedList.prototype.get = function (type) {
        var current = this._head;
        if (typeof current.data.is === 'function') {
            while (current) {
                if (current.data.is(type)) {
                    return current.data;
                }
                current = current.next;
            }
        } else {
            console.log('This type <' + type + '> does not support this method.');
        }
        return null;
    };
    return LinkedList;
}();
exports.LinkedList = LinkedList;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MiniSignalBinding = (function () {
  function MiniSignalBinding(fn, once, thisArg) {
    if (once === undefined) once = false;

    _classCallCheck(this, MiniSignalBinding);

    this._fn = fn;
    this._once = once;
    this._thisArg = thisArg;
    this._next = this._prev = this._owner = null;
  }

  _createClass(MiniSignalBinding, [{
    key: 'detach',
    value: function detach() {
      if (this._owner === null) return false;
      this._owner.detach(this);
      return true;
    }
  }]);

  return MiniSignalBinding;
})();

function _addMiniSignalBinding(self, node) {
  if (!self._head) {
    self._head = node;
    self._tail = node;
  } else {
    self._tail._next = node;
    node._prev = self._tail;
    self._tail = node;
  }

  node._owner = self;

  return node;
}

var MiniSignal = (function () {
  function MiniSignal() {
    _classCallCheck(this, MiniSignal);

    this._head = this._tail = undefined;
  }

  _createClass(MiniSignal, [{
    key: 'handlers',
    value: function handlers() {
      var exists = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      var node = this._head;

      if (exists) return !!node;

      var ee = [];

      while (node) {
        ee.push(node);
        node = node._next;
      }

      return ee;
    }
  }, {
    key: 'has',
    value: function has(node) {
      if (!(node instanceof MiniSignalBinding)) {
        throw new Error('MiniSignal#has(): First arg must be a MiniSignalBinding object.');
      }

      return node._owner === this;
    }
  }, {
    key: 'dispatch',
    value: function dispatch() {
      var node = this._head;

      if (!node) return false;

      while (node) {
        if (node._once) this.detach(node);
        node._fn.apply(node._thisArg, arguments);
        node = node._next;
      }

      return true;
    }
  }, {
    key: 'add',
    value: function add(fn) {
      var thisArg = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if (typeof fn !== 'function') {
        throw new Error('MiniSignal#add(): First arg must be a Function.');
      }
      return _addMiniSignalBinding(this, new MiniSignalBinding(fn, false, thisArg));
    }
  }, {
    key: 'once',
    value: function once(fn) {
      var thisArg = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if (typeof fn !== 'function') {
        throw new Error('MiniSignal#once(): First arg must be a Function.');
      }
      return _addMiniSignalBinding(this, new MiniSignalBinding(fn, true, thisArg));
    }
  }, {
    key: 'detach',
    value: function detach(node) {
      if (!(node instanceof MiniSignalBinding)) {
        throw new Error('MiniSignal#detach(): First arg must be a MiniSignalBinding object.');
      }
      if (node._owner !== this) return this;

      if (node._prev) node._prev._next = node._next;
      if (node._next) node._next._prev = node._prev;

      if (node === this._head) {
        this._head = node._next;
        if (node._next === null) {
          this._tail = null;
        }
      } else if (node === this._tail) {
        this._tail = node._prev;
        this._tail._next = null;
      }

      node._owner = null;
      return this;
    }
  }, {
    key: 'detachAll',
    value: function detachAll() {
      var node = this._head;
      if (!node) return this;

      this._head = this._tail = null;

      while (node) {
        node._owner = null;
        node = node._next;
      }
      return this;
    }
  }]);

  return MiniSignal;
})();

MiniSignal.MiniSignalBinding = MiniSignalBinding;

exports['default'] = MiniSignal;
module.exports = exports['default'];


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The default class for managing a NodeList. This class creates the NodeList and adds and removes
 * nodes to/from the list as the entities and the components in the engine change.
 *
 * It uses the basic entity matching pattern of an entity system - entities are added to the list if
 * they contain components matching all the public properties of the node class.
 */
var NodePool_1 = __webpack_require__(4);
var LinkedList_1 = __webpack_require__(1);
var Dictionary_1 = __webpack_require__(0);
var ComponentsFamily = /** @class */function () {
    /**
     * The constructor. Creates a ComponentsFamily to provide a NodeList for the
     * given node class.
     *
     * @param nodeClass The type of node to create and manage a NodeList for.
     * @param engine The engine that this family is managing teh NodeList for.
     */
    function ComponentsFamily(nodeClass, engine) {
        this._nodeClass = nodeClass;
        this._engine = engine;
        this._init();
    }
    /**
     * Initialises the class. Creates the nodelist and other tools. Analyses the node to determine
     * what component types the node requires.
     */
    ComponentsFamily.prototype._init = function () {
        this._nodes = new LinkedList_1.LinkedList();
        this._entities = new Dictionary_1.Dictionary(); // <Entity, Node>
        this._components = new Dictionary_1.Dictionary(); // <Type, string>
        var types = this._nodeClass['types'];
        for (var prop in types) {
            if (types.hasOwnProperty(prop)) {
                this._components.add(prop, types[prop]);
            }
        }
        this._nodePool = new NodePool_1.NodePool(this._nodeClass, this._components);
        this._nodePool.dispose(this._nodePool.get());
    };
    Object.defineProperty(ComponentsFamily.prototype, "nodeList", {
        /**
         * The nodelist managed by this family. This is a reference that remains valid always
         * since it is retained and reused by Systems that use the list. i.e. we never recreate the list,
         * we always modify it in place.
         */
        get: function get() {
            return this._nodes;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Called by the engine when an entity has been added to it. We check if the entity should be in
     * this family's NodeList and add it if appropriate.
     */
    ComponentsFamily.prototype.newEntity = function (entity) {
        this.addIfMatch(entity);
    };
    /**
     * Called by the engine when a component has been added to an entity. We check if the entity is not in
     * this family's NodeList and should be, and add it if appropriate.
     */
    ComponentsFamily.prototype.componentAddedToEntity = function (entity, componentClass) {
        this.addIfMatch(entity);
    };
    /**
     * Called by the engine when a component has been removed from an entity. We check if the removed component
     * is required by this family's NodeList and if so, we check if the entity is in this this NodeList and
     * remove it if so.
     */
    ComponentsFamily.prototype.componentRemovedFromEntity = function (entity, componentClass) {
        this.removeIfMatch(entity);
    };
    /**
     * Called by the engine when an entity has been rmoved from it. We check if the entity is in
     * this family's NodeList and remove it if so.
     */
    ComponentsFamily.prototype.removeEntity = function (entity) {
        this.removeIfMatch(entity);
    };
    /**
     * If the entity is not in this family's NodeList, tests the components of the entity to see
     * if it should be in this NodeList and adds it if so.
     */
    ComponentsFamily.prototype.addIfMatch = function (entity) {
        if (!this._entities.has(entity)) {
            this._components.forEach(function (componentClass) {
                if (!entity.hasComponent(componentClass)) {
                    return;
                }
            });
            // If the entity has not components, don't add it.
            if (entity.getAll().length > 0) {
                var node = this._nodePool.get();
                var types = node.types;
                for (var prop in types) {
                    if (types.hasOwnProperty(prop)) {
                        if (!entity.hasComponent(types[prop].name)) {
                            // Node prop was not found in the entity
                            return;
                        } else {
                            // Add entity value to node
                            node[prop] = entity.getComponent(types[prop].name);
                        }
                    }
                }
                node.entity = entity;
                this._entities.add(entity, node);
                this._nodes.add(node);
            }
        }
    };
    /**
     * Removes the entity if it is in this family's NodeList.
     */
    ComponentsFamily.prototype.removeIfMatch = function (entity) {
        if (this._entities.getValue(entity)) {
            var node = this._entities.getValue(entity);
            this._entities.remove(entity);
            for (var i = 0; i < this._nodes.size(); i++) {
                if (this._nodes.item(i) === node) {
                    this._nodes.remove(i);
                }
            }
            if (this._engine.updating) {
                this._nodePool.cache(node);
                this._engine.updateComplete.add(this._releaseNodePoolCache, this);
            } else {
                this._nodePool.dispose(node);
            }
        }
    };
    /**
     * Releases the nodes that were added to the node pool during this engine update, so they can
     * be reused.
     */
    ComponentsFamily.prototype._releaseNodePoolCache = function () {
        this._engine.updateComplete.detachAll();
        this._nodePool.releaseCache();
    };
    /**
     * Removes all nodes from the NodeList.
     */
    ComponentsFamily.prototype.cleanUp = function () {
        for (var i = 0; i < this._nodes.size(); i++) {
            this._entities.remove(this._nodes.item(i).entity);
            this._nodes.remove(i);
        }
    };
    return ComponentsFamily;
}();
exports.ComponentsFamily = ComponentsFamily;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var NodePool = /** @class */function () {
    /**
     * Creates a pool for the given node class.
     */
    function NodePool(nodeClass, components) {
        this._nodeClass = nodeClass;
        this._components = components;
    }
    /**
     * Fetches a node from the pool.
     */
    NodePool.prototype.get = function () {
        if (this._tail) {
            var node = this._tail;
            this._tail = this._tail.previous;
            node.previous = null;
            return node;
        } else {
            return Object.create(this._nodeClass);
        }
    };
    /**
     * Adds a node to the pool.
     */
    NodePool.prototype.dispose = function (node) {
        node.entity = null;
        node.next = null;
        node.previous = this._tail;
        this._tail = node;
    };
    /**
     * Adds a node to the cache
     */
    NodePool.prototype.cache = function (node) {
        node.previous = this._cacheTail;
        this._cacheTail = node;
    };
    /**
     * Releases all nodes from the cache into the pool
     */
    NodePool.prototype.releaseCache = function () {
        while (this._cacheTail) {
            var node = this._cacheTail;
            this._cacheTail = node.previous;
            this.dispose(node);
        }
    };
    return NodePool;
}();
exports.NodePool = NodePool;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @author       Stefan Herndlbauer <sherndlbauer@gorillabyte.com>
 * @copyright    2015-2018 Stefan Herndlbauer
 * @license      {@link https://github.com/Herndl/silverback.git/blob/master/README.md|MIT License}
 **/

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(6);
// Utility libraries
tslib_1.__exportStar(__webpack_require__(0), exports);
tslib_1.__exportStar(__webpack_require__(1), exports);
// Core components of the engine
tslib_1.__exportStar(__webpack_require__(7), exports);
tslib_1.__exportStar(__webpack_require__(9), exports);
tslib_1.__exportStar(__webpack_require__(10), exports);
tslib_1.__exportStar(__webpack_require__(11), exports);
tslib_1.__exportStar(__webpack_require__(4), exports);
tslib_1.__exportStar(__webpack_require__(12), exports);
tslib_1.__exportStar(__webpack_require__(3), exports);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["__extends"] = __extends;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (immutable) */ __webpack_exports__["__rest"] = __rest;
/* harmony export (immutable) */ __webpack_exports__["__decorate"] = __decorate;
/* harmony export (immutable) */ __webpack_exports__["__param"] = __param;
/* harmony export (immutable) */ __webpack_exports__["__metadata"] = __metadata;
/* harmony export (immutable) */ __webpack_exports__["__awaiter"] = __awaiter;
/* harmony export (immutable) */ __webpack_exports__["__generator"] = __generator;
/* harmony export (immutable) */ __webpack_exports__["__exportStar"] = __exportStar;
/* harmony export (immutable) */ __webpack_exports__["__values"] = __values;
/* harmony export (immutable) */ __webpack_exports__["__read"] = __read;
/* harmony export (immutable) */ __webpack_exports__["__spread"] = __spread;
/* harmony export (immutable) */ __webpack_exports__["__await"] = __await;
/* harmony export (immutable) */ __webpack_exports__["__asyncGenerator"] = __asyncGenerator;
/* harmony export (immutable) */ __webpack_exports__["__asyncDelegator"] = __asyncDelegator;
/* harmony export (immutable) */ __webpack_exports__["__asyncValues"] = __asyncValues;
/* harmony export (immutable) */ __webpack_exports__["__makeTemplateObject"] = __makeTemplateObject;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module Silverback
 * @class Engine
 */

Object.defineProperty(exports, "__esModule", { value: true });
var Dictionary_1 = __webpack_require__(0);
var LinkedList_1 = __webpack_require__(1);
var SystemSort_1 = __webpack_require__(8);
var ComponentsFamily_1 = __webpack_require__(3);
var MiniSignal = __webpack_require__(2);
/**
 * The Engine class is the central point for creating and managing your game state. Add
 * entities and systems to the engine, and fetch families of nodes from the engine.
 */
var Engine = /** @class */function () {
    function Engine() {
        /**
         * Indicates if the engine is currently in its update loop.
         */
        this.updating = false;
        /**
         * The class used to manage node lists. In most cases the default class is sufficient
         * but it is exposed here so advanced developers can choose to create and use a
         * different implementation.
         *
         * The class must implement the Family interface.
         */
        this.familyClass = null;
        this._systemList = [];
        this._entityList = new LinkedList_1.LinkedList();
        this._sceneList = new LinkedList_1.LinkedList();
        this._entityNames = new Dictionary_1.Dictionary();
        this._sceneNames = new Dictionary_1.Dictionary();
        this._families = new Dictionary_1.Dictionary();
        this.updateComplete = new MiniSignal();
        this.familyClass = ComponentsFamily_1.ComponentsFamily;
    }
    Object.defineProperty(Engine.prototype, "entities", {
        /**
         * Returns an array containing all the entities in the engine.
         */
        get: function get() {
            return this._entityList.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Engine.prototype, "scenes", {
        /**
         * Returns an array containing all the scenes in the engine.
         */
        get: function get() {
            return this._sceneList.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Engine.prototype, "systems", {
        /**
         * Returns an array containing all the systems in the engine.
         */
        get: function get() {
            return this._systemList;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add an entity to the engine.
     *
     * @param entity The entity to add.
     */
    Engine.prototype.addEntity = function (entity) {
        if (this._entityNames.has(entity.name)) {
            throw new Error('The entity name ' + entity.name + ' is already in use by another entity.');
        }
        this._entityList.add(entity);
        this._entityNames.add(entity.name, entity);
        entity.componentAdded.add(this._componentAdded, this);
        entity.componentRemoved.add(this._componentRemoved, this);
        entity.nameChanged.add(this._entityNameChanged, this);
        this._families.forEach(function (nodeObject, family) {
            family.newEntity(entity);
        });
    };
    /**
     * Remove an entity from the engine.
     *
     * @param entity The entity to remove.
     * @param index The index of the entity list.
     */
    Engine.prototype.removeEntity = function (entity, index) {
        entity.componentAdded.detachAll();
        entity.componentRemoved.detachAll();
        entity.nameChanged.detachAll();
        if (typeof index === 'undefined') {
            for (var i = 0; i < this._entityList.size(); i++) {
                if (this._entityList.item(i) === entity) {
                    this._entityList.remove(i);
                    this._entityNames.remove(entity.name);
                }
            }
        } else {
            this._entityList.remove(index);
            this._entityNames.remove(entity.name);
        }
        this._families.forEach(function (nodeObject, family) {
            family.removeEntity(entity);
        });
    };
    /**
     * Get an entity based on its name.
     *
     * @param name The name of the entity
     * @return The entity, or null if no entity with that name exists on the engine
     */
    Engine.prototype.getEntityByName = function (name) {
        if (this._entityNames.has(name)) {
            return this._entityNames.getValue(name);
        }
        return null;
    };
    /**
     * Remove all entities from the engine.
     */
    Engine.prototype.removeAllEntities = function () {
        var listSize = this._entityList.size() - 1;
        for (var i = listSize; i >= 0; i--) {
            this.removeEntity(this._entityList.item(i), i);
        }
    };
    /**
     * Add an scene to the engine.
     *
     * @param scene The scene to add.
     */
    Engine.prototype.addScene = function (scene) {
        this._sceneList.add(scene);
        this._sceneNames.add(scene.name, scene);
        scene.nameChanged.add(this._sceneNameChanged, this);
    };
    /**
     * Remove an scene from the engine.
     *
     * @param scene The scene to remove.
     * @param index The scene index in the sceneList
     */
    Engine.prototype.removeScene = function (scene, index) {
        if (typeof index === 'undefined') {
            for (var i = 0; i < this._sceneList.size(); i++) {
                if (this._sceneList.item(i) === scene) {
                    this._sceneList.remove(i);
                }
            }
        } else {
            this._sceneList.remove(index);
        }
        this._sceneNames.remove(scene.name);
        scene.nameChanged.detachAll();
    };
    /**
     * Remove all scenes from the engine.
     */
    Engine.prototype.removeAllScenes = function () {
        var listSize = this._sceneList.size() - 1;
        for (var i = listSize; i >= 0; i--) {
            this.removeScene(this._sceneList.item(i), i);
        }
    };
    /**
     * Get an scene based on its name.
     *
     * @param name The name of the scene
     * @return The scene, or null if no scene with that name exists on the engine
     */
    Engine.prototype.getSceneByName = function (name) {
        if (this._sceneNames.has(name)) {
            return this._sceneNames.getValue(name);
        }
        return null;
    };
    /**
     * Get the scene instance of a particular type from within the engine.
     *
     * @param type The type of scene
     * @return The instance of the scene type that is in the engine, or
     * null if no scene of this type are in the engine.
     */
    Engine.prototype.getScene = function (type) {
        return this._sceneList.get(type);
    };
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
    Engine.prototype.getNodeList = function (nodeClass) {
        if (this._families.has(nodeClass)) {
            return this._families.getValue(nodeClass).nodeList;
        } else {
            var family = new this.familyClass(nodeClass, this);
            this._families.add(nodeClass, family);
            for (var i = 0; i < this._entityList.size(); i++) {
                family.newEntity(this._entityList.item(i));
            }
            return family.nodeList;
        }
    };
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
    Engine.prototype.releaseNodeList = function (nodeClass) {
        if (this._families.has(nodeClass)) {
            this._families.getValue(nodeClass).cleanUp();
        } else {
            throw new Error('The given nodeClass was not found and can not be released.');
        }
        this._families.remove(nodeClass);
    };
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
    Engine.prototype.addSystem = function (system, priority) {
        system.priority = priority | 0;
        system.addToEngine(this);
        this._systemList.push(system);
        this._systemList = SystemSort_1.default(this._systemList);
    };
    /**
     * Get the system instance of a particular type from within the engine.
     *
     * @param type The type of system
     * @return The instance of the system type that is in the engine, or
     * null if no systems of this type are in the engine.
     */
    Engine.prototype.getSystem = function (type) {
        for (var i = 0, len = this._systemList.length; i < len; i++) {
            if (this._systemList[i].is(type)) {
                return this._systemList[i];
            }
        }
        return null;
    };
    /**
     * Remove a system from the engine.
     *
     * @param system The system to remove from the engine.
     * @param index The system index in the system list.
     */
    Engine.prototype.removeSystem = function (system, index) {
        if (typeof index === 'undefined') {
            for (var i = 0, len = this._systemList.length; i < len; i++) {
                if (this._systemList[i] === system) {
                    this._systemList.splice(i, 1);
                }
            }
        } else {
            this._systemList.splice(index - 1, 1);
        }
        system.removeFromEngine(this);
    };
    /**
     * Remove all systems from the engine.
     */
    Engine.prototype.removeAllSystems = function () {
        for (var i = this._systemList.length - 1; i >= 0; i--) {
            this.removeSystem(this._systemList[i], i);
        }
        return;
    };
    /**
     * Update the engine. This causes the engine update loop to run, calling update on all the
     * systems in the engine.
     *
     * @time The duration, in seconds, of this update step.
     */
    Engine.prototype.update = function (time) {
        this.updating = true;
        for (var i = 0, len = this._systemList.length; i < len; i++) {
            this._systemList[i].update(time);
        }
        this.updating = false;
        this.updateComplete.dispatch();
    };
    /**
     * @private
     */
    Engine.prototype._entityNameChanged = function (entity, oldName) {
        if (this._entityNames.has(oldName)) {
            this._entityNames.remove(oldName);
            this._entityNames.add(entity.name, entity);
        } else {
            throw new Error('The given name was not found in the entity list.');
        }
    };
    /**
     * @private
     */
    Engine.prototype._sceneNameChanged = function (scene, oldName) {
        if (this._sceneNames.has(oldName)) {
            this._sceneNames.remove(oldName);
            this._sceneNames.add(scene.name, scene);
        } else {
            throw new Error('The given name was not found in the scene list.');
        }
    };
    /**
     * @private
     */
    Engine.prototype._componentAdded = function (entity, componentClass) {
        this._families.forEach(function (nodeObject, family) {
            family.componentAddedToEntity(entity, componentClass);
        });
    };
    /**
     * @private
     */
    Engine.prototype._componentRemoved = function (entity, componentClass) {
        this._families.forEach(function (nodeObject, family) {
            family.componentRemovedFromEntity(entity, componentClass);
        });
    };
    return Engine;
}();
exports.Engine = Engine;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Insertion sort implementation in JavaScript
 * Copyright (c) 2012 Nicholas C. Zakas
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of items software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and items permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Swaps two values in an array.
 * @param {Array} items The array containing the items.
 * @param {int} firstIndex Index of first item to swap.
 * @param {int} secondIndex Index of second item to swap.
 * @return {void}
 */
function swap(items, firstIndex, secondIndex) {
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}
function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)].priority; // pivot value is middle item
    var i = left; // starts from left and goes right to pivot index
    var j = right; // starts from right and goes left to pivot index
    // while the two indices don't match
    while (i <= j) {
        // if the item on the left is less than the pivot, continue right
        while (items[i].priority < pivot) {
            i++;
        }
        // if the item on the right is greater than the pivot, continue left
        while (items[j].priority > pivot) {
            j--;
        }
        // if the two indices still don't match, swap the values
        if (i <= j) {
            swap(items, i, j);
            // change indices to continue loop
            i++;
            j--;
        }
    }
    // this value is necessary for recursion
    return i;
}
/**
 * A quicksort implementation in JavaScript. The array is sorted in place.
 * @param {Array} items An array of items to sort.
 * @return {Array} The sorted array.
 */
function systemSort(items, left, right) {
    var index;
    // performance - don't sort an array with zero or one items
    if (items.length > 1) {
        // fix left and right values - might not be provided
        left = typeof left !== 'number' ? 0 : left;
        right = typeof right !== 'number' ? items.length - 1 : right;
        // split up the entire array
        index = partition(items, left, right);
        // if the returned index
        if (left < index - 1) {
            systemSort(items, left, index - 1);
        }
        if (index < right) {
            systemSort(items, index, right);
        }
    }
    return items;
}
exports.default = systemSort;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * An entity is composed from components. As such, it is essentially a collection object for components.
 * Sometimes, the entities in a game will mirror the actual characters and objects in the game, but this
 * is not necessary.
 *
 * <p>Components are simple value objects that contain data relevant to the entity. Entities
 * with similar functionality will have instances of the same components. So we might have
 * a position component</p>
 *
 * <p><code>export class PositionComponent
 * {
 *   public x :number;
 *   public y :number;
 * }</code></p>
 *
 * <p>All entities that have a position in the game world, will have an instance of the
 * position component. Systems operate on entities based on the components they have.</p>
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var Dictionary_1 = __webpack_require__(0);
var MiniSignal = __webpack_require__(2);
var Entity = /** @class */function () {
    function Entity(name) {
        if (name === void 0) {
            name = '';
        }
        this._components = new Dictionary_1.Dictionary();
        this.componentAdded = new MiniSignal();
        this.componentRemoved = new MiniSignal();
        this.nameChanged = new MiniSignal();
        if (name.length > 0) {
            this._name = name;
        } else {
            this._name = 'entity' + ++Entity.nameCount;
        }
    }
    Object.defineProperty(Entity.prototype, "name", {
        /**
         * All entities have a name. If no name is set, a default name is used. Names are used to
         * fetch specific entities from the engine, and can also help to identify an entity when debugging.
         */
        get: function get() {
            return this._name;
        },
        set: function set(value) {
            if (this._name !== value) {
                var previous = this._name;
                this._name = value;
                this.nameChanged.dispatch(this, previous);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add a component to the entity.
     *
     * @param component The component object to add.
     * @param componentClass The class of the component. This is only necessary if the component
     * extends another component class and you want the framework to treat the component as of
     * the base class type. If not set, the class type is determined directly from the component.
     *
     * @return A reference to the entity. This enables the chaining of calls to add, to make
     * creating and configuring entities cleaner. e.g.
     *
     * <code>var entity : Entity = new Entity()
     *     .add(new Position(100, 200))
     *     .add(new Display(new PlayerClip());</code>
     */
    Entity.prototype.addComponent = function (component, componentClass) {
        if (typeof componentClass === 'undefined') {
            componentClass = component.constructor.name;
        }
        if (this._components.has(componentClass)) {
            this.removeComponent(componentClass);
        }
        this._components.add(componentClass, component);
        this.componentAdded.dispatch(this, componentClass);
        return this;
    };
    /**
     * Remove a component from the entity.
     *
     * @param componentClass The class of the component to be removed.
     * @return the component, or null if the component doesn't exist in the entity
     */
    Entity.prototype.removeComponent = function (componentClass) {
        var component = this._components.getValue(componentClass);
        if (component) {
            this._components.remove(componentClass);
            this.componentRemoved.dispatch(this, componentClass);
            return component;
        }
        return null;
    };
    /**
     * Get a component from the entity.
     *
     * @param componentClass The class of the component requested.
     * @return The component, or null if none was found.
     */
    Entity.prototype.getComponent = function (componentClass) {
        return this._components.getValue(componentClass);
    };
    /**
     * Does the entity have a component of a particular type.
     *
     * @param componentClass The class of the component sought.
     * @return true if the entity has a component of the type, false if not.
     */
    Entity.prototype.hasComponent = function (componentClass) {
        return this._components.has(componentClass);
    };
    /**
     * Get all components from the entity.
     *
     * @return An array containing all the components that are on the entity.
     */
    Entity.prototype.getAll = function () {
        var componentArray = [];
        this._components.forEach(function (componentClass, component) {
            componentArray.push(component);
        });
        return componentArray;
    };
    Object.defineProperty(Entity.prototype, "scene", {
        set: function set(scene) {
            this._addedToScene = scene;
        },
        enumerable: true,
        configurable: true
    });
    Entity.prototype.toString = function () {
        var seen = [];
        return JSON.stringify(this, function (key, val) {
            if ((typeof val === "undefined" ? "undefined" : _typeof(val)) === 'object') {
                if (seen.indexOf(val) >= 0) {
                    return;
                }
                seen.push(val);
            }
            return val;
        }, 4);
    };
    Entity.nameCount = 0;
    return Entity;
}();
exports.Entity = Entity;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The abstract class for a system implementation.
 *
 * <p>A system is part of the core functionality of the game. After a system is added to the engine, its
 * update method will be called on every frame of the engine. When the system is removed from the engine,
 * the update method is no longer called.</p>
 *
 * <p>The aggregate of all systems in the engine is the functionality of the game, with the update
 * methods of those systems collectively constituting the engine update loop. Systems generally operate on
 * node lists - collections of nodes. Each node contains the components from an entity in the engine
 * that match the node.</p>
 */
var System = /** @class */function () {
  function System() {
    /**
     * Used internally to manage the list of systems within the engine. The previous system in the list.
     */
    this.previous = null;
    /**
     * Used internally to manage the list of systems within the engine. The next system in the list.
     */
    this.next = null;
    /**
     * Used internally to hold the priority of this system within the system list. This is
     * used to order the systems so they are updated in the correct order.
     */
    this.priority = 0;
  }
  /**
   * Called just after the system is added to the engine, before any calls to the update method.
   * Override this method to add your own functionality.
   *
   * @param engine The engine the system was added to.
   */
  System.prototype.addToEngine = function (engine) {
    throw new Error('Don\'t call the abstract class directly, this method must be overridden.');
  };
  /**
   * Called just after the system is removed from the engine, after all calls to the update method.
   * Override this method to add your own functionality.
   *
   * @param engine The engine the system was removed from.
   */
  System.prototype.removeFromEngine = function (engine) {
    throw new Error('Don\'t call the abstract class directly, this method must be overridden.');
  };
  /**
   * After the system is added to the engine, this method is called every frame until the system
   * is removed from the engine. Override this method to add your own functionality.
   *
   * <p>If you need to perform an action outside of the update loop (e.g. you need to change the
   * systems in the engine and you don't want to do it while they're updating) add a listener to
   * the engine's updateComplete signal to be notified when the update loop completes.</p>
   *
   * @param time The duration, in seconds, of the frame.
   */
  System.prototype.update = function (time) {
    throw new Error('Don\'t call the abstract class directly, this method must be overridden.');
  };
  System.prototype.is = function (type) {
    return type.prototype.isPrototypeOf(this);
  };
  return System;
}();
exports.System = System;
System.prototype.previous = null;
System.prototype.next = null;
System.prototype.priority = 0;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * The base class for a node.
 *
 * <p>A node is a set of different components that are required by a system.
 * A system can request a collection of nodes from the engine. Subsequently the Engine object creates
 * a node for every entity that has all of the components in the node class and adds these nodes
 * to the list obtained by the system. The engine keeps the list up to date as entities are added
 * to and removed from the engine and as the components on entities change.</p>
 */

Object.defineProperty(exports, "__esModule", { value: true });
var Node = /** @class */function () {
  function Node() {
    /**
     * The entity whose components are included in the node.
     */
    this.entity = null;
    /**
     * Used by the NodeList class. The previous node in a node list.
     */
    this.previous = null;
    /**
     * Used by the NodeList class. The next node in a node list.
     */
    this.next = null;
  }
  return Node;
}();
exports.Node = Node;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var LinkedList_1 = __webpack_require__(1);
var Dictionary_1 = __webpack_require__(0);
var MiniSignal = __webpack_require__(2);
var Scene = /** @class */function () {
    function Scene(name) {
        if (name === void 0) {
            name = '';
        }
        this._entities = new Dictionary_1.Dictionary();
        this.entityAdded = new MiniSignal();
        this.entityRemoved = new MiniSignal();
        this._entityList = new LinkedList_1.LinkedList();
        this._entityNames = new Dictionary_1.Dictionary();
        this.nameChanged = new MiniSignal();
        if (name) {
            this._name = name;
        } else {
            this._name = '_scene' + ++Scene.nameCount;
        }
    }
    Object.defineProperty(Scene.prototype, "name", {
        /**
         * All scenes have a name. If no name is set, a default name is used. Names are used to
         * fetch specific scenes from the engine, and can also help to identify an entity when debugging.
         */
        get: function get() {
            return this._name;
        },
        set: function set(value) {
            if (this._name !== value) {
                var previous = this._name;
                this._name = value;
                this.nameChanged.dispatch(this, previous);
            }
        },
        enumerable: true,
        configurable: true
    });
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
    Scene.prototype.addEntity = function (entity, entityClass) {
        if (typeof entityClass === 'undefined') {
            entityClass = entity.constructor;
        }
        this._entityList.add(entity);
        this._entityNames.add(entity.name, entity);
        this.entityAdded.dispatch(this, entityClass);
        entity.scene = this;
        return this;
    };
    /**
     * Remove a entity from the scene.
     *
     * @param entity The entity to be removed.
     * @param index The index of the entity in the entityList.
     */
    Scene.prototype.removeEntity = function (entity, index) {
        if (typeof index === 'undefined') {
            for (var i = 0; i < this._entityList.size(); i++) {
                if (this._entityList.item(i) === entity) {
                    this._entityList.remove(i);
                }
            }
        } else {
            this._entityList.remove(index);
        }
    };
    /**
     * Get a entity from the scene.
     *
     * @param entityName The class of the entity requested.
     * @return The entity, or null if none was found.
     */
    Scene.prototype.getEntityWithName = function (entityName) {
        for (var i = 0; i < this._entityList.size(); i++) {
            if (this._entityList.item(i).name === entityName) {
                return this._entityList.item(i);
            }
        }
        return null;
    };
    /**
     * Get all entities from the scene.
     *
     * @return An array containing all the entities that are on the scene.
     */
    Scene.prototype.getAllEntities = function () {
        return this._entityList.toArray();
    };
    /**
     * Does the entity have a entity of a particular type.
     *
     * @param entityName The class of the entity sought.
     * @return true if the entity has a entity of the type, false if not.
     */
    Scene.prototype.hasEntityWithName = function (entityName) {
        for (var i = 0, len = this._entityList.size(); i < len; i++) {
            if (this._entityList.item(i).name === entityName) {
                return true;
            }
        }
        return false;
    };
    /**
     * Checks the type, if the prototype is matching.
     *
     * @return {boolean} Return if the prototypes match.
     */
    Scene.prototype.is = function (type) {
        return type.prototype.isPrototypeOf(this);
    };
    Scene.nameCount = 0;
    return Scene;
}();
exports.Scene = Scene;

/***/ })
/******/ ]);
//# sourceMappingURL=silverback.js.map