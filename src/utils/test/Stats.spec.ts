/* tslint:disable:no-empty one-line */
import chai = require('chai');
import { Stats } from '../Stats';

const expect = chai.expect;

function mockCanvas(window) {
    window.HTMLCanvasElement.prototype.getContext = function() {
        return {
            fillRect: function() {},
            clearRect: function() {},
            getImageData: function(x, y, w, h) {
                return {
                    data: new Array(w * h * 4)
                };
            },
            putImageData: function() {},
            createImageData: function() {
                return [];
            },
            setTransform: function() {},
            drawImage: function() {},
            save: function() {},
            fillText: function() {},
            restore: function() {},
            beginPath: function() {},
            moveTo: function() {},
            lineTo: function() {},
            closePath: function() {},
            stroke: function() {},
            translate: function() {},
            scale: function() {},
            rotate: function() {},
            arc: function() {},
            fill: function() {},
            measureText: function() {
                return { width: 0 };
            },
            transform: function() {},
            rect: function() {},
            clip: function() {}
        };
    };

    window.HTMLCanvasElement.prototype.toDataURL = function() {
        return '';
    };
}

const window = document.defaultView;
mockCanvas(window);

function sleepFor(sleepDuration) {
    let now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) {
        /* mocking do nothing */
    }
}

describe('Utils - Stats', () => {
    before(function() {
        this.jsdom = require('jsdom-global')();
    });

    after(function() {
        this.jsdom();
    });

    it('should create correctly a new Stats instance', () => {
        const stats = new Stats();
        stats.showPanel(0);
        expect(typeof stats === 'object').to.deep.equal(true);
        expect(stats.dom).to.be.instanceOf(HTMLDivElement);
    });

    it('should start tracking stats over time correctly', () => {
        const stats = new Stats();
        stats.showPanel(0);
        stats.begin();
        const beginTime = stats.beginTime;
        stats.update();
        const afterTime = stats.prevTime;
        expect(beginTime).to.not.deep.equal(afterTime);
    });

    it('should only update the stats after a certain time', () => {
        const stats = new Stats();
        stats.showPanel(0);
        stats.begin();
        const beginTime = stats.beginTime;
        sleepFor(1000);
        stats.update();
        const afterTime = stats.beginTime;
        expect(beginTime).to.not.deep.equal(afterTime);
    });
});
