var silverback =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(1));
	__export(__webpack_require__(2));
	__export(__webpack_require__(3));
	__export(__webpack_require__(8));
	__export(__webpack_require__(9));
	__export(__webpack_require__(10));
	__export(__webpack_require__(6));
	__export(__webpack_require__(11));
	__export(__webpack_require__(5));

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Dictionary = function () {
	    function Dictionary() {
	        _classCallCheck(this, Dictionary);
	
	        this._keys = [];
	        this._values = [];
	    }
	
	    _createClass(Dictionary, [{
	        key: 'add',
	        value: function add(key, value) {
	            var keyIndex = this.getIndex(key);
	            if (keyIndex >= 0) {
	                this._values[keyIndex] = value;
	            } else {
	                this._keys.push(key);
	                this._values.push(value);
	            }
	        }
	    }, {
	        key: 'remove',
	        value: function remove(key) {
	            var keyIndex = this.getIndex(key);
	            if (keyIndex >= 0) {
	                var removedValue = this._values[keyIndex];
	                this._keys.splice(keyIndex, 1);
	                this._values.splice(keyIndex, 1);
	                return removedValue;
	            } else {
	                throw 'Key does not exist';
	            }
	        }
	    }, {
	        key: 'getValue',
	        value: function getValue(key) {
	            var value = null;
	            var keyIndex = this.getIndex(key);
	            if (keyIndex >= 0) {
	                value = this._values[keyIndex];
	            }
	            return value;
	        }
	    }, {
	        key: 'getIndex',
	        value: function getIndex(testKey) {
	            var len = this._keys.length;
	            var key = void 0;
	            for (var i = 0; i < len; ++i) {
	                key = this._keys[i];
	                if (key === testKey) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	    }, {
	        key: 'has',
	        value: function has(testKey) {
	            var len = this._keys.length;
	            var key = void 0;
	            for (var i = 0; i < len; ++i) {
	                key = this._keys[i];
	                if (key === testKey) {
	                    return true;
	                }
	            }
	            return false;
	        }
	    }, {
	        key: 'values',
	        value: function values() {
	            var len = this._keys.length;
	            var key = void 0;
	            var value = void 0;
	            var arValue = [];
	            for (var i = 0; i < len; ++i) {
	                key = this._keys[i];
	                value = this._values[i];
	                arValue.push(value);
	            }
	            return arValue;
	        }
	    }, {
	        key: 'forEach',
	        value: function forEach(action) {
	            var len = this._keys.length;
	            var key = void 0;
	            var value = void 0;
	            for (var i = 0; i < len; ++i) {
	                key = this._keys[i];
	                value = this._values[i];
	                var breakHere = action(key, value);
	                if (breakHere === 'return') {
	                    return false;
	                }
	            }
	            return true;
	        }
	    }]);
	
	    return Dictionary;
	}();
	
	exports.Dictionary = Dictionary;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LinkedList = function () {
	    function LinkedList() {
	        _classCallCheck(this, LinkedList);
	
	        this._head = null;
	        this._tail = null;
	        this._length = 0;
	    }
	
	    _createClass(LinkedList, [{
	        key: 'add',
	        value: function add(data) {
	            var node = {
	                data: data,
	                next: null,
	                previous: null
	            };
	            if (this._length === 0) {
	                this._head = node;
	                this._tail = node;
	                if (typeof data.next !== 'undefined') {
	                    data.next = data.previous = null;
	                }
	            } else {
	                this._tail.next = node;
	                node.previous = this._tail;
	                node.next = null;
	                this._tail = node;
	            }
	            this._length++;
	        }
	    }, {
	        key: 'item',
	        value: function item(index) {
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
	        }
	    }, {
	        key: 'remove',
	        value: function remove(index) {
	            if (index > -1 && index < this._length) {
	                var current = this._head;
	                var i = 0;
	                if (index === 0) {
	                    this._head = current.next;
	                    if (!this._head) {
	                        this._tail = null;
	                    } else {
	                        this._head.previous = null;
	                    }
	                } else if (index === this._length - 1) {
	                    current = this._tail;
	                    this._tail = current.previous;
	                    this._tail.next = null;
	                } else {
	                    while (i++ < index) {
	                        current = current.next;
	                    }
	                    current.previous.next = current.next;
	                    current.next.previous = current.previous;
	                }
	                this._length--;
	                return current.data;
	            } else {
	                return null;
	            }
	        }
	    }, {
	        key: 'size',
	        value: function size() {
	            return this._length;
	        }
	    }, {
	        key: 'toArray',
	        value: function toArray() {
	            var result = [];
	            var current = this._head;
	            while (current) {
	                result.push(current.data);
	                current = current.next;
	            }
	            return result;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return this.toArray().toString();
	        }
	    }, {
	        key: 'get',
	        value: function get(type) {
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
	        }
	    }, {
	        key: 'first',
	        get: function get() {
	            if (this._head !== null) {
	                return this._head.data;
	            }
	            return undefined;
	        }
	    }, {
	        key: 'last',
	        get: function get() {
	            if (this._tail !== null) {
	                return this._tail.data;
	            }
	            return undefined;
	        }
	    }]);
	
	    return LinkedList;
	}();
	
	exports.LinkedList = LinkedList;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Dictionary_1 = __webpack_require__(1);
	var LinkedList_1 = __webpack_require__(2);
	var SystemSort_1 = __webpack_require__(4);
	var ComponentsFamily_1 = __webpack_require__(5);
	var MiniSignal = __webpack_require__(7);
	
	var Engine = function () {
	    function Engine() {
	        _classCallCheck(this, Engine);
	
	        this.updating = false;
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
	
	    _createClass(Engine, [{
	        key: 'addEntity',
	        value: function addEntity(entity) {
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
	        }
	    }, {
	        key: 'removeEntity',
	        value: function removeEntity(entity, index) {
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
	        }
	    }, {
	        key: 'getEntityByName',
	        value: function getEntityByName(name) {
	            if (this._entityNames.has(name)) {
	                return this._entityNames.getValue(name);
	            }
	            return null;
	        }
	    }, {
	        key: 'removeAllEntities',
	        value: function removeAllEntities() {
	            var listSize = this._entityList.size() - 1;
	            for (var i = listSize; i >= 0; i--) {
	                this.removeEntity(this._entityList.item(i), i);
	            }
	        }
	    }, {
	        key: 'addScene',
	        value: function addScene(scene) {
	            this._sceneList.add(scene);
	            this._sceneNames.add(scene.name, scene);
	            scene.nameChanged.add(this._sceneNameChanged, this);
	        }
	    }, {
	        key: 'removeScene',
	        value: function removeScene(scene, index) {
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
	        }
	    }, {
	        key: 'removeAllScenes',
	        value: function removeAllScenes() {
	            var listSize = this._sceneList.size() - 1;
	            for (var i = listSize; i >= 0; i--) {
	                this.removeScene(this._sceneList.item(i), i);
	            }
	        }
	    }, {
	        key: 'getSceneByName',
	        value: function getSceneByName(name) {
	            if (this._sceneNames.has(name)) {
	                return this._sceneNames.getValue(name);
	            }
	            return null;
	        }
	    }, {
	        key: 'getScene',
	        value: function getScene(type) {
	            return this._sceneList.get(type);
	        }
	    }, {
	        key: 'getNodeList',
	        value: function getNodeList(nodeClass) {
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
	        }
	    }, {
	        key: 'releaseNodeList',
	        value: function releaseNodeList(nodeClass) {
	            if (this._families.has(nodeClass)) {
	                this._families.getValue(nodeClass).cleanUp();
	            } else {
	                throw new Error('The given nodeClass was not found and can not be released.');
	            }
	            this._families.remove(nodeClass);
	        }
	    }, {
	        key: 'addSystem',
	        value: function addSystem(system, priority) {
	            system.priority = priority | 0;
	            system.addToEngine(this);
	            this._systemList.push(system);
	            this._systemList = SystemSort_1.default(this._systemList);
	        }
	    }, {
	        key: 'getSystem',
	        value: function getSystem(type) {
	            for (var i = 0, len = this._systemList.length; i < len; i++) {
	                if (this._systemList[i].is(type)) {
	                    return this._systemList[i];
	                }
	            }
	            return null;
	        }
	    }, {
	        key: 'removeSystem',
	        value: function removeSystem(system, index) {
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
	        }
	    }, {
	        key: 'removeAllSystems',
	        value: function removeAllSystems() {
	            for (var i = this._systemList.length - 1; i >= 0; i--) {
	                this.removeSystem(this._systemList[i], i);
	            }
	            return;
	        }
	    }, {
	        key: 'update',
	        value: function update(time) {
	            this.updating = true;
	            for (var i = 0, len = this._systemList.length; i < len; i++) {
	                this._systemList[i].update(time);
	            }
	            this.updating = false;
	            this.updateComplete.dispatch();
	        }
	    }, {
	        key: '_entityNameChanged',
	        value: function _entityNameChanged(entity, oldName) {
	            if (this._entityNames.has(oldName)) {
	                this._entityNames.remove(oldName);
	                this._entityNames.add(entity.name, entity);
	            } else {
	                throw new Error('The given name was not found in the entity list.');
	            }
	        }
	    }, {
	        key: '_sceneNameChanged',
	        value: function _sceneNameChanged(scene, oldName) {
	            if (this._sceneNames.has(oldName)) {
	                this._sceneNames.remove(oldName);
	                this._sceneNames.add(scene.name, scene);
	            } else {
	                throw new Error('The given name was not found in the scene list.');
	            }
	        }
	    }, {
	        key: '_componentAdded',
	        value: function _componentAdded(entity, componentClass) {
	            this._families.forEach(function (nodeObject, family) {
	                family.componentAddedToEntity(entity, componentClass);
	            });
	        }
	    }, {
	        key: '_componentRemoved',
	        value: function _componentRemoved(entity, componentClass) {
	            this._families.forEach(function (nodeObject, family) {
	                family.componentRemovedFromEntity(entity, componentClass);
	            });
	        }
	    }, {
	        key: 'entities',
	        get: function get() {
	            return this._entityList.toArray();
	        }
	    }, {
	        key: 'scenes',
	        get: function get() {
	            return this._sceneList.toArray();
	        }
	    }, {
	        key: 'systems',
	        get: function get() {
	            return this._systemList;
	        }
	    }]);
	
	    return Engine;
	}();
	
	exports.Engine = Engine;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	function swap(items, firstIndex, secondIndex) {
	    var temp = items[firstIndex];
	    items[firstIndex] = items[secondIndex];
	    items[secondIndex] = temp;
	}
	function partition(items, left, right) {
	    var pivot = items[Math.floor((right + left) / 2)].priority;
	    var i = left;
	    var j = right;
	    while (i <= j) {
	        while (items[i].priority < pivot) {
	            i++;
	        }
	        while (items[j].priority > pivot) {
	            j--;
	        }
	        if (i <= j) {
	            swap(items, i, j);
	            i++;
	            j--;
	        }
	    }
	    return i;
	}
	function systemSort(items, left, right) {
	    var index = void 0;
	    if (items.length > 1) {
	        left = typeof left !== 'number' ? 0 : left;
	        right = typeof right !== 'number' ? items.length - 1 : right;
	        index = partition(items, left, right);
	        if (left < index - 1) {
	            systemSort(items, left, index - 1);
	        }
	        if (index < right) {
	            systemSort(items, index, right);
	        }
	    }
	    return items;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = systemSort;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NodePool_1 = __webpack_require__(6);
	var LinkedList_1 = __webpack_require__(2);
	var Dictionary_1 = __webpack_require__(1);
	
	var ComponentsFamily = function () {
	    function ComponentsFamily(nodeClass, engine) {
	        _classCallCheck(this, ComponentsFamily);
	
	        this._nodeClass = nodeClass;
	        this._engine = engine;
	        this._init();
	    }
	
	    _createClass(ComponentsFamily, [{
	        key: '_init',
	        value: function _init() {
	            this._nodes = new LinkedList_1.LinkedList();
	            this._entities = new Dictionary_1.Dictionary();
	            this._components = new Dictionary_1.Dictionary();
	            var types = this._nodeClass['types'];
	            for (var prop in types) {
	                if (types.hasOwnProperty(prop)) {
	                    this._components.add(prop, types[prop]);
	                }
	            }
	            this._nodePool = new NodePool_1.NodePool(this._nodeClass, this._components);
	            this._nodePool.dispose(this._nodePool.get());
	        }
	    }, {
	        key: 'newEntity',
	        value: function newEntity(entity) {
	            this.addIfMatch(entity);
	        }
	    }, {
	        key: 'componentAddedToEntity',
	        value: function componentAddedToEntity(entity, componentClass) {
	            this.addIfMatch(entity);
	        }
	    }, {
	        key: 'componentRemovedFromEntity',
	        value: function componentRemovedFromEntity(entity, componentClass) {
	            this.removeIfMatch(entity);
	        }
	    }, {
	        key: 'removeEntity',
	        value: function removeEntity(entity) {
	            this.removeIfMatch(entity);
	        }
	    }, {
	        key: 'addIfMatch',
	        value: function addIfMatch(entity) {
	            if (!this._entities.has(entity)) {
	                this._components.forEach(function (componentClass) {
	                    if (!entity.hasComponent(componentClass)) {
	                        return;
	                    }
	                });
	                if (entity.getAll().length > 0) {
	                    var node = this._nodePool.get();
	                    var types = node.types;
	                    for (var prop in types) {
	                        if (types.hasOwnProperty(prop)) {
	                            if (!entity.hasComponent(types[prop].name)) {
	                                return;
	                            } else {
	                                node[prop] = entity.getComponent(types[prop].name);
	                            }
	                        }
	                    }
	                    node.entity = entity;
	                    this._entities.add(entity, node);
	                    this._nodes.add(node);
	                }
	            }
	        }
	    }, {
	        key: 'removeIfMatch',
	        value: function removeIfMatch(entity) {
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
	        }
	    }, {
	        key: '_releaseNodePoolCache',
	        value: function _releaseNodePoolCache() {
	            this._engine.updateComplete.detachAll();
	            this._nodePool.releaseCache();
	        }
	    }, {
	        key: 'cleanUp',
	        value: function cleanUp() {
	            for (var i = 0; i < this._nodes.size(); i++) {
	                this._entities.remove(this._nodes.item(i).entity);
	                this._nodes.remove(i);
	            }
	        }
	    }, {
	        key: 'nodeList',
	        get: function get() {
	            return this._nodes;
	        }
	    }]);
	
	    return ComponentsFamily;
	}();
	
	exports.ComponentsFamily = ComponentsFamily;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NodePool = function () {
	    function NodePool(nodeClass, components) {
	        _classCallCheck(this, NodePool);
	
	        this._nodeClass = nodeClass;
	        this._components = components;
	    }
	
	    _createClass(NodePool, [{
	        key: "get",
	        value: function get() {
	            if (this._tail) {
	                var node = this._tail;
	                this._tail = this._tail.previous;
	                node.previous = null;
	                return node;
	            } else {
	                return Object.create(this._nodeClass);
	            }
	        }
	    }, {
	        key: "dispose",
	        value: function dispose(node) {
	            node.entity = null;
	            node.next = null;
	            node.previous = this._tail;
	            this._tail = node;
	        }
	    }, {
	        key: "cache",
	        value: function cache(node) {
	            node.previous = this._cacheTail;
	            this._cacheTail = node;
	        }
	    }, {
	        key: "releaseCache",
	        value: function releaseCache() {
	            while (this._cacheTail) {
	                var node = this._cacheTail;
	                this._cacheTail = node.previous;
	                this.dispose(node);
	            }
	        }
	    }]);
	
	    return NodePool;
	}();
	
	exports.NodePool = NodePool;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Dictionary_1 = __webpack_require__(1);
	var MiniSignal = __webpack_require__(7);
	
	var Entity = function () {
	    function Entity() {
	        var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	        _classCallCheck(this, Entity);
	
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
	
	    _createClass(Entity, [{
	        key: 'addComponent',
	        value: function addComponent(component, componentClass) {
	            if (typeof componentClass === 'undefined') {
	                componentClass = component.constructor.name;
	            }
	            if (this._components.has(componentClass)) {
	                this.removeComponent(componentClass);
	            }
	            this._components.add(componentClass, component);
	            this.componentAdded.dispatch(this, componentClass);
	            return this;
	        }
	    }, {
	        key: 'removeComponent',
	        value: function removeComponent(componentClass) {
	            var component = this._components.getValue(componentClass);
	            if (component) {
	                this._components.remove(componentClass);
	                this.componentRemoved.dispatch(this, componentClass);
	                return component;
	            }
	            return null;
	        }
	    }, {
	        key: 'getComponent',
	        value: function getComponent(componentClass) {
	            return this._components.getValue(componentClass);
	        }
	    }, {
	        key: 'hasComponent',
	        value: function hasComponent(componentClass) {
	            return this._components.has(componentClass);
	        }
	    }, {
	        key: 'getAll',
	        value: function getAll() {
	            var componentArray = [];
	            this._components.forEach(function (componentClass, component) {
	                componentArray.push(component);
	            });
	            return componentArray;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            var seen = [];
	            return JSON.stringify(this, function (key, val) {
	                if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
	                    if (seen.indexOf(val) >= 0) {
	                        return;
	                    }
	                    seen.push(val);
	                }
	                return val;
	            }, 4);
	        }
	    }, {
	        key: 'name',
	        get: function get() {
	            return this._name;
	        },
	        set: function set(value) {
	            if (this._name !== value) {
	                var previous = this._name;
	                this._name = value;
	                this.nameChanged.dispatch(this, previous);
	            }
	        }
	    }, {
	        key: 'scene',
	        set: function set(scene) {
	            this._addedToScene = scene;
	        }
	    }]);
	
	    return Entity;
	}();
	
	Entity.nameCount = 0;
	exports.Entity = Entity;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var System = function () {
	    function System() {
	        _classCallCheck(this, System);
	
	        this.previous = null;
	        this.next = null;
	        this.priority = 0;
	    }
	
	    _createClass(System, [{
	        key: 'addToEngine',
	        value: function addToEngine(engine) {
	            throw new Error('Don\'t call the abstract class directly, this method must be overridden.');
	        }
	    }, {
	        key: 'removeFromEngine',
	        value: function removeFromEngine(engine) {
	            throw new Error('Don\'t call the abstract class directly, this method must be overridden.');
	        }
	    }, {
	        key: 'update',
	        value: function update(time) {
	            throw new Error('Don\'t call the abstract class directly, this method must be overridden.');
	        }
	    }, {
	        key: 'is',
	        value: function is(type) {
	            return type.prototype.isPrototypeOf(this);
	        }
	    }]);
	
	    return System;
	}();
	
	exports.System = System;
	System.prototype.previous = null;
	System.prototype.next = null;
	System.prototype.priority = 0;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Node = function Node() {
	    _classCallCheck(this, Node);
	
	    this.entity = null;
	    this.previous = null;
	    this.next = null;
	};
	
	exports.Node = Node;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LinkedList_1 = __webpack_require__(2);
	var Dictionary_1 = __webpack_require__(1);
	var MiniSignal = __webpack_require__(7);
	
	var Scene = function () {
	    function Scene() {
	        var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	        _classCallCheck(this, Scene);
	
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
	
	    _createClass(Scene, [{
	        key: 'addEntity',
	        value: function addEntity(entity, entityClass) {
	            if (typeof entityClass === 'undefined') {
	                entityClass = entity.constructor;
	            }
	            this._entityList.add(entity);
	            this._entityNames.add(entity.name, entity);
	            this.entityAdded.dispatch(this, entityClass);
	            entity.scene = this;
	            return this;
	        }
	    }, {
	        key: 'removeEntity',
	        value: function removeEntity(entity, index) {
	            if (typeof index === 'undefined') {
	                for (var i = 0; i < this._entityList.size(); i++) {
	                    if (this._entityList.item(i) === entity) {
	                        this._entityList.remove(i);
	                    }
	                }
	            } else {
	                this._entityList.remove(index);
	            }
	        }
	    }, {
	        key: 'getEntityWithName',
	        value: function getEntityWithName(entityName) {
	            for (var i = 0; i < this._entityList.size(); i++) {
	                if (this._entityList.item(i).name === entityName) {
	                    return this._entityList.item(i);
	                }
	            }
	            return null;
	        }
	    }, {
	        key: 'getAllEntities',
	        value: function getAllEntities() {
	            return this._entityList.toArray();
	        }
	    }, {
	        key: 'hasEntityWithName',
	        value: function hasEntityWithName(entityName) {
	            for (var i = 0, len = this._entityList.size(); i < len; i++) {
	                if (this._entityList.item(i).name === entityName) {
	                    return true;
	                }
	            }
	            return false;
	        }
	    }, {
	        key: 'is',
	        value: function is(type) {
	            return type.prototype.isPrototypeOf(this);
	        }
	    }, {
	        key: 'name',
	        get: function get() {
	            return this._name;
	        },
	        set: function set(value) {
	            if (this._name !== value) {
	                var previous = this._name;
	                this._name = value;
	                this.nameChanged.dispatch(this, previous);
	            }
	        }
	    }]);
	
	    return Scene;
	}();
	
	Scene.nameCount = 0;
	exports.Scene = Scene;

/***/ }
/******/ ]);
//# sourceMappingURL=silverback.js.map