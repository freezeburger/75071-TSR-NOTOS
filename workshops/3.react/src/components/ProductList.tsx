import { useState } from "react";
import { Product } from "../types/products";
import Button from "./Button";


const ProductList = () => {

    const [ products, setProducts ] = useState<Product[]>([])

    return (
        <>
            <h2>Products List</h2>
            <Button color="primary">Load Products</Button>
            <Button color="danger">Delete</Button>
            <hr />
            <ul className="list-group">
                { 
                    products.map((product) => (
                        <li className="list-group-item" key={product.id}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>{product.title}</h5>
                                    <p>Category: {product.category}</p>
                                    <p>Price: ${product.price.toFixed(2)}</p>
                                </div>
                                <span className="badge bg-primary rounded-pill">{product.rating} ⭐</span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}

export default ProductList;