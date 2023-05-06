import { Product } from "./Product";

export type Order = {
  id: string;
  items: Product[];
};
