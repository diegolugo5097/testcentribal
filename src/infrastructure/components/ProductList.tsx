import * as React from "react";
import { Product } from "../../domain/models/Product";
import { productService } from "../../domain/services/product.services";
import ModalView from "./Modal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { productState } from "../recoil/atoms/productState";
import { onSaveState } from "../recoil/atoms/onSaveState";
import { useTranslation } from "react-i18next";

type ProductListProps = {
  onSelectProduct: (product: Product) => void;
};

export const ProductList: React.FC<ProductListProps> = ({
  onSelectProduct,
}) => {
  const [t, _] = useTranslation("global");
  const [products, setProducts] = React.useState<Product[]>([]);
  const [id, setId] = React.useState<string>("");
  const setProduct = useSetRecoilState(productState);
  const onSave = useRecoilValue(onSaveState) as Boolean;

  React.useEffect(() => {
    productService.getProducts().then(setProducts);
  }, []);

  React.useEffect(() => {
    if (onSave) {
      productService.getProducts().then(setProducts);
    }
  }, [onSave]);

  React.useEffect(() => {
    if (id !== "") {
      productService.getProductById(id).then(setProduct);
    }
  }, [id]);

  return (
    <div className="relative overflow-x-auto">
      <div className="flex justify-end m-10">
        <ModalView nameButton={t("button.add")} />
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              {t("th.reference")}
            </th>
            <th scope="col" className="px-6 py-3">
              {t("th.title")}
            </th>
            <th scope="col" className="px-6 py-3">
              {t("th.description")}
            </th>
            <th scope="col" className="px-6 py-3">
              {t("th.price")}
            </th>
            <th scope="col" className="px-6 py-3">
              {t("th.actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              className="hover:bg-gray-50 cursor-pointer bg-white border-b dark:bg-gray-600 dark:border-gray-700"
              key={index}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium dark:bg-gray-700 dark:text-gray-400 text-gray-900 whitespace-nowrap"
              >
                {product.reference}
              </th>
              <td className="px-6 py-4">{product.title}</td>
              <td className="px-6 py-4">{product.description}</td>
              <td className="px-6 py-4">$ {product.price}</td>
              <td className="px-6 py-4 flex gap-1">
                <button
                  className="bg-white px-4 py-3 rounded border-2 hover:bg-gray-200"
                  onClick={() => onSelectProduct(product)}
                >
                  {t("button.add")}
                </button>
                <button onClick={() => setId(product.id)}>
                  <ModalView nameButton={t("button.edit")} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
