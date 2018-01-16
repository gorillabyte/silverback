export class Dictionary {

    private _map: Map<any, any>;

    constructor() {
        this._map = new Map();
    }

    public add(key, value) {
        this._map.set(key, value);
    }

    public remove(key): any {
        this._map.delete(key);
    }

    public getValue(key) {
        return this._map.get(key);
    }

    public has(testKey) {
        return this._map.has(testKey);
    }

    public values(): any[] {
        return [...this._map.values() as any];
    }

    public forEach(action) {
        this._map.forEach((value, key) => {
            let breakHere = action(key, value);
            return breakHere !== 'return';
        });
    }
}
