import { Product } from "../models/Product";
import { Order } from "../models/Order";
import { generateUid } from "../../infrastructure/uid/uid";

const hasProduct = (order: Order, product: Product) =>
  order.items.find((item) => item.id === product.id);

const createOrder = (product: Product) => ({
  id: generateUid(),
  items: [product],
});

const increaseOrder = (order: Order, product: Product): Order => ({
  ...order,
  items: [...order.items, product],
});

const addProductToOrder = (product: Product, order?: Order | null): Order =>
  order
    ? hasProduct(order, product)
      ? order
      : increaseOrder(order, product)
    : createOrder(product);

export const orderService = {
  addProductToOrder,
};
