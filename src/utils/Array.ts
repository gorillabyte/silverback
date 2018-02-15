/**
 * Check if a given object can be found in an array
 * @param {any[]} a
 * @param obj
 * @returns {boolean}
 */
export function arrayContains(a: any[], obj): boolean {
    let i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
