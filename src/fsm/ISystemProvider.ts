import { System } from '../core';

export interface ISystemProvider {
    identifier;
    priority: number;
    getSystem(): System;
}
