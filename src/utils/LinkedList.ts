/**
 *  Linked List implementation in JavaScript, Released under the MIT license
 *  https://github.com/nzakas/computer-science-in-javascript/
 *
 *  @author     Stefan Herndlbauer, 2015, TypeScript conversion
 *  @author     Nicholas C. Zakas, 2009, Doubly Linked List
 *  @url        http://www.gorillabyte.com
 */

export class LinkedList {
    /**
     * Pointer to first item in the list.
     * @property _head
     * @type Object
     * @private
     */
    private head = null;

    /**
     * Pointer to last item in the list.
     * @property _tail
     * @type Object
     * @private
     */
    private tail = null;

    /**
     * The number of items in the list.
     * @property _length
     * @type number
     * @private
     */
    private length = 0;

    /**
     * Appends some data to the end of the list. This method traverses
     * the existing list and places the value at the end in a new item.
     * @param {any} data The data to add to the list.
     * @return {void}
     * @method add
     */
    public add(data) {
        // Create a new item object, place data in
        const node = {
            data,
            next: null,
            previous: null,
        };

        // Special case: no items in the list yet
        if (this.length === 0) {
            this.head = node;
            this.tail = node;
            // If node has next and previous properties
            if (typeof data.next !== 'undefined') {
                data.next = data.previous = null;
            }
        } else {
            // Attach to the tail node
            this.tail.next = node;
            node.previous = this.tail;
            node.next = null;
            this.tail = node;
        }
        // Don't forget to update the count
        this.length++;
    }

    /**
     * Retrieves the data in the given position in the list.
     * @param {number} index The zero-based index of the item whose value should be returned.
     * @return {any} The value in the "data" portion of the given item or null if the item doesn't exist.
     * @method item
     */
    public item(index: number) {
        // check for out-of-bounds values
        if (index > -1 && index < this.length) {
            let current = this.head;
            let i = 0;

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
    public remove(index: number) {
        // Check for out-of-bounds values
        if (index > -1 && index < this.length) {
            let current = this.head;
            let i = 0;

            // Special case: removing first item
            if (index === 0) {
                this.head = current.next;

                /*
                 * If there's only one item in the list and you remove it,
                 * then this._head will be null. In that case, you should
                 * also set this._tail to be null to effectively destroy
                 * the list. Otherwise, set the previous pointer on the new
                 * this._head to be null.
                 */
                if (!this.head) {
                    this.tail = null;
                } else {
                    this.head.previous = null;
                }

                // special case: removing last item
            } else if (index === this.length - 1) {
                current = this.tail;
                this.tail = current.previous;
                this.tail.next = null;
            } else {
                // find the right location
                while (i++ < index) {
                    current = current.next;
                }

                // skip over the item to remove
                current.previous.next = current.next;
                current.next.previous = current.previous;
            }

            // Decrement the length
            this.length--;

            // Return the value
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
        return this.length;
    }

    /**
     * Converts the list into an array.
     * @return {Array} An array containing all of the data in the list.
     * @method toArray
     */
    public toArray() {
        const result = [];
        let current = this.head;

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

    /**
     * Returns the first element in this list.
     * @return {any} The first element of the list or undefined if the list is empty.
     */
    public get first() {
        if (this.head !== null) {
            return this.head.data;
        }
        return undefined;
    }

    /**
     * Returns the last element in this list.
     * @return {any} the last element in the list or undefined if the list is empty.
     */
    public get last() {
        if (this.tail !== null) {
            return this.tail.data;
        }
        return undefined;
    }

    /**
     * Returns the a list element by its type.
     * @return {any} The element of the list or null if the item was not in the list.
     */
    public get(type) {
        let current: any = this.head;
        if (typeof current.data.is === 'function') {
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
