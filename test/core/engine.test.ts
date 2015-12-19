/// <reference path="../../typings/tsd.d.ts" />

import {Engine} from '../../src/core/Engine';
import {System} from '../../src/core/System';

describe('First test', function() {
    it('should create an instance of silverback engine', function() {
        var e = new Engine();
        e.addSystem(new System(), 0);
        e.removeAllSystems();
    });
});