/// <reference path="./node_modules/@types/assertion-error/index.d.ts" />
/// <reference path="./node_modules/@types/bluebird/index.d.ts" />
/// <reference path="./node_modules/@types/chai/index.d.ts" />
/// <reference path="./node_modules/@types/benchmark/index.d.ts" />
/// <reference path="./node_modules/@types/express/index.d.ts" />
/// <reference path="./node_modules/@types/karma/index.d.ts" />
/// <reference path="./node_modules/@types/mime/index.d.ts" />
/// <reference path="./node_modules/@types/mocha/index.d.ts" />
/// <reference path="./node_modules/@types/node/index.d.ts" />
/// <reference path="./node_modules/@types/serve-static/index.d.ts" />
/// <reference path="types/mini-signals.d.ts" />

interface Window {
    Silverback: any;
}
declare const Silverback: any;

interface Set<T> {
    add(value: T): Set<T>;
    clear(): void;
    delete(value: T): boolean;
    entries(): Array<[T, T]>;
    forEach(callbackfn: (value: T, index: T, set: Set<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    keys(): Array<T>;
    size: number;
}

interface SetConstructor {
    new <T>(): Set<T>;
    new <T>(iterable: Array<T>): Set<T>;
    prototype: Set<any>;
}
declare var Set: SetConstructor;

interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    entries(): IterableIterator<[K, V]>;
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V;
    has(key: K): boolean;
    keys(): IterableIterator<K>;
    set(key: K, value?: V): Map<K, V>;
    size: number;
    values(): IterableIterator<V>;
    [Symbol.iterator]():IterableIterator<[K, V]>;
}

interface MapConstructor {
    new <K, V>(): Map<K, V>;
    new <K, V>(iterable: Iterable<[K, V]>): Map<K, V>;
    prototype: Map<any, any>;
}
declare var Map: MapConstructor;
