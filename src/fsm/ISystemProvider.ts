/// <reference path="../../typings/index.d.ts" />

import {System} from '../core/System';

export interface ISystemProvider {
    getSystem():System;
    identifier;
    priority:number;
}