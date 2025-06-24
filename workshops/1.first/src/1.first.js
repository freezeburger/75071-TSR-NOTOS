/**
 * 1.first.js
 * 
 * Creer une fonction acceptant un tableau (Array) et une valeur de tranche (eg. 5).
 * Et retournant deux methodes de navigation dans le tableau :
 * - next() : retourne les N elements suivant du tableau
 * - previous() : retourne les N element precedent du tableau
 * - get() : retourne la tranche courante
 * 
 * Implement a function that accepts an array and a slice size (e.g., 5). 
 * It returns an object with three methods for navigating the array: 
 * -next(),  next Slice
 * -previous(),  previous Slice
 * -get() current Slice
 * 
 */

/**
 * Reception parametres :
 * argument valueArray
 * argument slice
 * 
 * Stocker les valeurs reçues.
 * 
 * Prévoir les fonctions (sans arguments)
 * 
 * Retourner les fonction dans un objet (CHOIX)
 * 
 */

//ES5

/* function createArrayNavigator(valueArray, sliceRange){

    var initialArray = valueArray;
    var range = sliceRange;
    var index = 0;

    var valueObject = new Object(); // {} 

    function next(){
        index = index+range;
        var array = initialArray.slice(index,index + range)
        return array
    }
    function previous(){
        index = index - range > 0 ? index - range : 0; 
        var array = initialArray.slice(index, index + range)
        return array
    }
    function get(){
        return initialArray.slice(index,index+range)
    }

    valueObject.next = next;
    valueObject.previous = previous;
    valueObject.get = get;

    return valueObject;

} */

/* 
function createArrayNavigator(valueArray, sliceRange) {

    var initialArray = valueArray;
    var range = sliceRange;
    var index = 0;


    return {
        next: function () {
            index = index + range;
            var array = initialArray.slice(index, index + range)
            return array
        },
        get:function () {
            return initialArray.slice(index, index + range)
        },
        previous:function () {
            index = index - range > 0 ? index - range : 0;
            var array = initialArray.slice(index, index + range)
            return array
        },
    };

} */


/* const createArrayNavigator = (valueArray, sliceRange) => {

    const initialArray = valueArray;
    const range = sliceRange;
    let index = 0;

    return {
        next() {
            index = index + range;
            var array = initialArray.slice(index, index + range)
            return array
        },
        get() {
            return initialArray.slice(index, index + range)
        },
        previous() {
            index = index - range > 0 ? index - range : 0;
            var array = initialArray.slice(index, index + range)
            return array
        }
    };

} */


/* const createArrayNavigator = (valueArray, sliceRange) => {

    const initialArray = valueArray;
    const range = sliceRange;
    let index = 0;

    const next = () => {
        index = index + range;
        return initialArray.slice(index, index + range)
    }

    const get = () => initialArray.slice(index, index + range)

    const previous = () => {
        index = index - range > 0 ? index - range : 0;
        return initialArray.slice(index, index + range)
    }

    return {
        next:next,
        get:get,
        previous:previous
    };

} */



/* const createArrayNavigator = (valueArray, range) => {

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

} */


/* const createArrayNavigator = (valueArray, range) => {

    return new Navigable(valueArray, range);

} */

/* function Navigable(value,range){
    this.valueArray = value;
    this.range = range;
    this.index = 0;
}
Navigable.prototype.previous = function(){
    this.index = this.index - this.range > 0 ? this.index - this.range : 0;
    return valueArray.slice(this.index, this.index + this.range)
}
Navigable.prototype.get = function(){
    return this.valueArray.slice(index, index + range)
}
Navigable.prototype.next = function(){
    this.index = this.index + this.range;
    return this.valueArray.slice(this.index, this.index + this.range)
}
 */

class Navigable{
    constructor(value,range){
        this.valueArray = value;
        this.range = range;
        this.index = 0;  
    }

    // Navigable.prototype
    previous(){
        this.index = this.index - this.range > 0 ? this.index - this.range : 0;
        return valueArray.slice(this.index, this.index + this.range)
    }
    get(){
        return this.valueArray.slice(index, index + range)
    }
    next(){
        this.index = this.index + this.range;
        return this.valueArray.slice(this.index, this.index + this.range)
    }

}
