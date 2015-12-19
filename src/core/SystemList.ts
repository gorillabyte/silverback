/// <reference path="../../typings/tsd.d.ts" />

/**
 * Used internally, this is an ordered list of Systems for use by the engine update loop.
 */

import {System} from './System';

export class SystemList {

    public head:System;
    public tail:System;

    public add(system:System) {
        if (!this.head) {
            this.head = this.tail = system;
            system.next = system.previous = null;
        } else {
            for (var node = this.tail; node; node = node.previous) {
                if (node.priority <= system.priority) {
                    break;
                }
            }
            if (node === this.tail) {
                this.tail.next = system;
                system.previous = this.tail;
                system.next = null;
                this.tail = system;
            } else if (!node) {
                system.next = this.head;
                system.previous = null;
                this.head.previous = system;
                this.head = system;
            } else {
                system.next = node.next;
                system.previous = node;
                node.next.previous = system;
                node.next = system;
            }
        }
    }

    public remove(system:System) {
        if (this.head === system) {
            this.head = this.head.next;
        }
        if (this.tail === system) {
            this.tail = this.tail.previous;
        }

        if (system.previous) {
            system.previous.next = system.next;
        }

        if (system.next) {
            system.next.previous = system.previous;
        }
    }

    public removeAll() {
        while (this.head) {
            var system = this.head;
            this.head = this.head.next;
            system.previous = null;
            system.next = null;
        }
        this.tail = null;
    }

    public get(type):System {
        for (var system = this.head; system; system = system.next) {
            if (system.is(type)) {
                return system;
            }
        }
        return null;
    }
}