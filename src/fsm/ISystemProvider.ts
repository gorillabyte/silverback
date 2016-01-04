/// <reference path="../../typings/tsd.d.ts" />

import {System} from '../core/System';

export interface ISystemProvider {
    getSystem():System;
    identifier;
    priority:number;
}