
/**
 * A standardize way to navigate through an array of unknown values.
 * It allows you to get the next, previous, or current values in the array.
 * The range of values to return can be specified.
 * 
 * @example
 * const navigator = createArrayNavigator([1, 2, 3, 4, 5], 2);  
 * navigator.get(); // returns [1, 2]
 */
interface Result{
    next: () => unknown[];
    get: () =>  unknown[];
    previous: () => unknown[];
}

/**
 * An array of unknown values that can be navigated through.
 */
type ValueArray = unknown[];

const createArrayNavigator = (
    valueArray:ValueArray = [], 
    range = 1
):Result => {

    let index = 0;

    const next = () => {
        index = index + range;
        return valueArray.slice(index, index + range)
    }

    const get = () => valueArray.slice(index, index + range)

    const previous = () => {
        index = index - range > 0 ? index - range : 0;
        return valueArray.slice(index, index + range)
    }

    return {
        next,
        get,
        previous
    };

}

createArrayNavigator( [] ,1)