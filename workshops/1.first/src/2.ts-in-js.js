//@ts-check

/** @type {function(string[], number):any}  */
/* const createArrayNavigator = (valueArray = [], range = 1) => {

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

// Usage
createArrayNavigator(123,1) */