import { Product } from "../../domain/models/Product";
import { http } from "../../infrastructure/http/http";
import { ProductDTO } from "../http/dto/ProductDTO";

export const productRepository = {
  getProducts: async () => {
    const products = await http.get<ProductDTO[]>("http://localhost:3004/data");
    return products.map((productDto): Product => {
      return {
        id: productDto.id,
        reference: productDto.reference,
        title: productDto.title,
        description: productDto.description,
        price: productDto.price,
        tax: productDto.tax,
      };
    });
  },
  getProductById: async (id: string) => {
    const product = await http.get<ProductDTO[]>(
      `http://localhost:3004/data/${id}`
    );
    return product;
  },
  updateProduct: async (id: string, body: Product) => {
    await http.put<ProductDTO[]>(
      `http://localhost:3004/data/${id}`,
      JSON.stringify(body)
    );
  },
  createProduct: async (body: Product) => {
    await http.post<ProductDTO[]>(
      `http://localhost:3004/data/`,
      JSON.stringify(body)
    );
  },
};
