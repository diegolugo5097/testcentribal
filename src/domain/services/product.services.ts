import { productRepository } from "../../infrastructure/repositories/product.repository";
import { Product } from "../models/Product";

export const productService = {
  getProducts: () => {
    return productRepository.getProducts();
  },
  getProductById: (id: string) => {
    return productRepository.getProductById(id);
  },
  updateProduct: (id: string, body: Product) => {
    return productRepository.updateProduct(id, body);
  },
  createProduct: (body: Product) => {
    return productRepository.createProduct(body);
  },
};
