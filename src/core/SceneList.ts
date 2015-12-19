/// <reference path="../../typings/tsd.d.ts" />

import {Scene} from './Scene';

export class SceneList {
    public head:Scene;
    public tail:Scene;

    public add(scene:Scene) {
        if (!this.head) {
            this.head = this.tail = scene;
            scene.next = scene.previous = null;
        } else {
            this.tail.next = scene;
            scene.previous = this.tail;
            scene.next = null;
            this.tail = scene;
        }
    }

    public remove(scene:Scene) {
        if (this.head === scene) {
            this.head = this.head.next;
        }
        if (this.tail === scene) {
            this.tail = this.tail.previous;
        }

        if (scene.previous) {
            scene.previous.next = scene.next;
        }

        if (scene.next) {
            scene.next.previous = scene.previous;
        }
    }

    private _removeAll() {
        while (this.head) {
            var scene:Scene = this.head;
            this.head = this.head.next;
            scene.previous = null;
            scene.next = null;
        }
        this.tail = null;
    }

    public get(type):Scene {
        for (var scene = this.head; scene; scene = scene.next) {
            if (scene.is(type)) {
                return scene;
            }
        }
        return null;
    }
}