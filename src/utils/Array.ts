export function arrayContains(a, obj): boolean {
    let i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 * @url http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
 */
export function shuffle(a) {
    let j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

export function has(object, key) {
    return object ? Object.prototype.hasOwnProperty.call(object, key) : false;
}
