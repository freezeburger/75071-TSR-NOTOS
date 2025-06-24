import { CrudService } from "../types/crud.pattern";
import { Product } from "../types/products";


class ProductService implements CrudService<Product>{}