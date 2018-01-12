/**
 * Optimized 2D general-purpose vector class with fairly complete functionality.
 */

export class Vec2D {

    public x:number;
    public y:number;
    public l:number;

    constructor(x?:number, y?:number) {
        if (typeof x === 'undefined') {
            x = 0;
        }
        if (typeof y === 'undefined') {
            y = 0;
        }
        this.x = x;
        this.y = y;
        this.l = this.getLength();
    }

    public setLength(value:number):Vec2D {
        let oldLength:number = this.l;
        if (oldLength !== 0 && value !== oldLength) {
            this.multiplyScalar(value / oldLength);
        }
        return this;
    }

    public getLength():number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    public getLengthSq():number {
        return (this.x * this.x) + (this.y * this.y);
    }

    public setAngle(value):Vec2D {
        let len = this.getAngle();
        this.x = Math.cos(value) * len;
        this.y = Math.sin(value) * len;
        return this;
    }

    public getAngle():number {
        return Math.atan2(this.y, this.x);
    }

    public rotateBy(theta):Vec2D {
        let x = this.x, y = this.y;
        let cos = Math.cos(theta), sin = Math.sin(theta);
        this.x = x * cos - y * sin;
        this.y = x * sin + y * cos;
        return this;
    }

    public add(v:Vec2D):Vec2D {
        return new Vec2D(this.x + v.x, this.y + v.y);
    }

    public addScalar(s:number):Vec2D {
        this.x += s;
        this.y += s;
        return this;
    }

    public subtract(v:Vec2D):Vec2D {
        return new Vec2D(this.x - v.x, this.y - v.y);
    }

    public subtractScalar(s):Vec2D {
        this.x -= s;
        this.y -= s;
        return this;
    }

    public scale(v:Vec2D):Vec2D {
        return new Vec2D(this.x * v.x, this.y * v.y);
    }

    public multiply(v:Vec2D):Vec2D {
        let v2:Vec2D = new Vec2D(this.x, this.y);
        v2.x *= v.x;
        v2.y *= v.y;
        v2.l *= v.l;
        return v2;
    }

    public multiplyScalar(s:number):Vec2D {
        this.x *= s;
        this.y *= s;
        this.l *= s;
        return this;
    }

    public divide(v):Vec2D {
        if (v.x === 0 || v.y === 0) {
            return this;
        }
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }

    public divideScalar(s):Vec2D {
        if (s === 0) {
            return this;
        }
        this.x /= s;
        this.y /= s;
        return this;
    }

    /**
     * Calculate the perpendicular vector (normal).
     */
    public perp():Vec2D {
        this.y = -this.y;
        return this;
    }

    public negate():Vec2D {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    /**
     * This function assumes min < max, if this assumption isn't true it will not operate correctly.
     */
    public clamp(min, max):Vec2D {
        if (this.x < min.x) {
            this.x = min.x;
        } else if (this.x > max.x) {
            this.x = max.x;
        }
        if (this.y < min.y) {
            this.y = min.y;
        } else if (this.y > max.y) {
            this.y = max.y;
        }
        return this;
    }

    /**
     * Calculate a vector dot product.
     * @param {Vec2D} v A vector
     * @return {number} The dot product
     */
    public dotProduct(v:Vec2D):number {
        return (this.x * v.x + this.y * v.y);
    }

    /**
     * Calculate the cross product of this and another vector.
     * @param {Vec2D} v A vector
     * @return {number} The cross product
     */
    public crossProd(v:Vec2D):number {
        return this.x * v.y - this.y * v.x;
    }

    public truncate(max:number):Vec2D {
        let i:number = max / this.l;
        i = i < 1.0 ? 1.0 : i;
        return this.multiplyScalar(i);
    }

    public angleTo(v:Vec2D):number {
        let dx = this.x - v.x;
        let dy = this.y - v.y;
        return Math.atan2(dy, dx);
    }

    public distanceTo(v:Vec2D):number {
        let dx = this.x - v.x;
        let dy = this.y - v.y;
        return Math.sqrt((dx * dx) + (dy * dy));
    }

    public distanceToSquared(v):number {
        let dx = this.x - v.x;
        let dy = this.y - v.y;
        return dx * dx + dy * dy;
    }

    public lerp(v, alpha):Vec2D {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        return this;
    }

    /**
     * Normalize the vector
     * @return {Vec2D}
     */
    public normalize():Vec2D {
        if (this.l === 0) {
            return this;
        }
        this.x /= this.l;
        this.y /= this.l;

        return this;
    }

    public reset(x, y):Vec2D {
        x = x ? x : 0;
        y = y ? y : 0;
        this.x = x;
        this.y = y;
        return this;
    }

    public equals(v):boolean {
        return this.x === v.x && this.y === v.y;
    }

    /**
     * Copy from given Vector.
     */
    public copy(v:Vec2D) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    /**
     * Return a new Vector object using this as a start.
     */
    public clone():Vec2D {
        return new Vec2D(this.x, this.y);
    }
}
