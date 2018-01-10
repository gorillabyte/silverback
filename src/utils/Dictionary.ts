/// <reference path="../../typings/index.d.ts" />

export class Dictionary {

    private _keys: any[];
    private _values: any[];

    constructor() {
        this._keys = [];
        this._values = [];
    }

    public add(key, value) {
        let keyIndex = this.getIndex(key);

        if (keyIndex >= 0) {
            this._values[keyIndex] = value;
        } else {
            this._keys.push(key);
            this._values.push(value);
        }
    }

    public remove(key): any {
        let keyIndex = this.getIndex(key);

        if (keyIndex >= 0) {
            var removedValue = this._values[keyIndex];
            this._keys.splice(keyIndex, 1);
            this._values.splice(keyIndex, 1);
            return removedValue;
        } else {
            throw 'Key does not exist';
        }
    }

    public getValue(key) {
        let value = null;
        let keyIndex = this.getIndex(key);

        if (keyIndex >= 0) {
            value = this._values[keyIndex];
        }
        return value;
    }

    public getIndex(testKey) {
        let len = this._keys.length;
        let key;

        for (let i = 0; i < len; ++i) {
            key = this._keys[i];
            if (key === testKey) {
                return i;
            }
        }
        return -1;
    }

    public has(testKey) {
        let len = this._keys.length;
        let key;

        for (let i = 0; i < len; ++i) {
            key = this._keys[i];
            if (key === testKey) {
                return true;
            }
        }
        return false;
    }

    public values(): any[] {
        let len = this._keys.length;
        let key;
        let value;
        let arValue: any[] = [];

        for (let i = 0; i < len; ++i) {
            key = this._keys[i];
            value = this._values[i];
            arValue.push(value);
        }
        return arValue;
    }

    public forEach(action) {
        let len = this._keys.length;
        let key;
        let value;

        for (let i = 0; i < len; ++i) {
            key = this._keys[i];
            value = this._values[i];
            var breakHere = action(key, value);
            if (breakHere === 'return') {
                return false;
            }
        }
        return true;
    }
}
