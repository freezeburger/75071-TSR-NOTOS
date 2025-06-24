
import './api-products.ts'; 
import './server-component/index.ts'; 
import { Product } from './types/products.ts';

const START_MESSAGE = 'Starting the application...';

console.log( START_MESSAGE );

// import('./api-products.js').then( m => console.table(m))


const URL = 'https://dummyjson.com/products'

type ApiResponse = {
    products: Array<Product> //Product[]
}

fetch(URL)
    .then<ApiResponse>(res => res.json())
    .then(data => {
        console.log('Products fetched successfully:');
        console.log(data.products.map( (product) => product.category ));
    })

