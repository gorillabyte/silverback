/**
 *  Linked List implementation in JavaScript, Released under the MIT license
 *  https://github.com/nzakas/computer-science-in-javascript/
 *
 *  @author     Stefan Herndlbauer, 2015, TypeScript conversion
 *  @author     Nicholas C. Zakas, 2009, Doubly Linked List
 *
 *  @url        http://www.gorillabyte.com
 */

export class LinkedList {

    /**
     * Pointer to first item in the list.
     * @property _head
     * @type Object
     * @private
     */
    private _head = null;

    /**
     * Pointer to last item in the list.
     * @property _tail
     * @type Object
     * @private
     */
    private _tail = null;

    /**
     * The number of items in the list.
     * @property _length
     * @type int
     * @private
     */
    private _length = 0;

    /**
     * Appends some data to the end of the list. This method traverses
     * the existing list and places the value at the end in a new item.
     * @param {any} data The data to add to the list.
     * @return {Void}
     * @method add
     */
    public add(data) {

        //create a new item object, place data in
        var node = {
            data: data,
            next: null,
            prev: null
        };

        //special case: no items in the list yet
        if (this._length === 0) {
            this._head = node;
            this._tail = node;
        } else {

            //attach to the tail node
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }

        //don't forget to update the count
        this._length++;

    }

    /**
     * Retrieves the data in the given position in the list.
     * @param {int} index The zero-based index of the item whose value
     *      should be returned.
     * @return {any} The value in the "data" portion of the given item
     *      or null if the item doesn't exist.
     * @method item
     */
    public item(index) {
        //check for out-of-bounds values
        if (index > -1 && index < this._length) {
            var current = this._head,
                i = 0;

            while (i++ < index) {
                current = current.next;
            }

            return current.data;
        } else {
            return null;
        }
    }

    /**
     * Removes the item from the given location in the list.
     * @param {int} index The zero-based index of the item to remove.
     * @return {any} The data in the given position in the list or null if
     *      the item doesn't exist.
     * @method remove
     */
    public remove(index) {
        //check for out-of-bounds values
        if (index > -1 && index < this._length) {

            var current = this._head,
                i = 0;

            //special case: removing first item
            if (index === 0) {
                this._head = current.next;

                /*
                 * If there's only one item in the list and you remove it,
                 * then this._head will be null. In that case, you should
                 * also set this._tail to be null to effectively destroy
                 * the list. Otherwise, set the previous pointer on the new
                 * this._head to be null.
                 */
                if (!this._head) {
                    this._tail = null;
                } else {
                    this._head.prev = null;
                }

                //special case: removing last item
            } else if (index === this._length - 1) {
                current = this._tail;
                this._tail = current.prev;
                this._tail.next = null;
            } else {

                //find the right location
                while (i++ < index) {
                    current = current.next;
                }

                //skip over the item to remove
                current.prev.next = current.next;
                current.next.prev = current.prev;
            }

            //decrement the length
            this._length--;

            //return the value
            return current.data;

        } else {
            return null;
        }
    }

    /**
     * Returns the number of items in the list.
     * @return {int} The number of items in the list.
     * @method size
     */
    public size() {
        return this._length;
    }

    /**
     * Converts the list into an array.
     * @return {Array} An array containing all of the data in the list.
     * @method toArray
     */
    public toArray() {
        var result = [],
            current = this._head;

        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }

    /**
     * Converts the list into a string representation.
     * @return {String} A string representation of the list.
     * @method toString
     */
    public toString() {
        return this.toArray().toString();
    }

    public get(type) {
        var current:any = this._head;
        if(typeof current.data.is === 'function') {
            while (current) {
                if (current.data.is(type)) {
                    return current.data;
                }
                current = current.next;
            }
        } else {
            console.log('This type <' + type + '> does not support this method.');
        }
        return null;
    }
}



