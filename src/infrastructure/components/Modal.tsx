import React, { useEffect } from "react";
import Modal from "react-modal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { productState } from "../recoil/atoms/productState";
import { Product } from "../../domain/models/Product";
import { productService } from "../../domain/services/product.services";
import { onSaveState } from "../recoil/atoms/onSaveState";
import { useTranslation } from "react-i18next";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "1px 2px #888888",
  },
};

const ModalView = (props: { nameButton: string }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [t, _] = useTranslation("global");
  const [postData, setPostData] = React.useState({
    id: "",
    reference: "",
    title: "",
    description: "",
    price: "",
    tax: "",
  });
  const product = useRecoilValue(productState) as Product;
  const setOnSave = useSetRecoilState(onSaveState);

  useEffect(() => {
    if (product.id !== undefined) {
      setPostData(product);
    }
  }, [product.id]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    setOnSave(true);
    if (product.id !== undefined) {
      productService.updateProduct(product.id, postData);
    } else {
      productService.createProduct(postData);
    }
    closeModal();
  };

  return (
    <div className="">
      <button
        onClick={openModal}
        className="bg-white px-4 py-3 rounded border-2 hover:bg-gray-200"
      >
        {props.nameButton}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div>
          <button
            onClick={closeModal}
            className="relative right-0 float-right text-red-600 font-bolder text-2xl"
          >
            X
          </button>
          <label className="flex justify-center text-green-600 m-5 font-semibold">
            {t("label.titleManager")}
          </label>
          <form onSubmit={handleSumbit}>
            <label className="block text-gray-700 text-sm font-bold my-2">
              {t("th.reference")}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={postData.reference}
              name="reference"
              onChange={(e) =>
                setPostData({ ...postData, reference: e.target.value })
              }
            />
            <label className="block text-gray-700 text-sm font-bold my-2">
              {t("th.title")}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={postData.title}
              name="title"
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
            <label className="block text-gray-700 text-sm font-bold my-2">
              {t("th.description")}
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={postData.description}
              name="description"
              onChange={(e) =>
                setPostData({ ...postData, description: e.target.value })
              }
            />
            <label className="block text-gray-700 text-sm font-bold my-2">
              {t("th.price")}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={postData.price}
              name="price"
              type="number"
              onChange={(e) =>
                setPostData({ ...postData, price: e.target.value })
              }
            />
            <label className="block text-gray-700 text-sm font-bold my-2">
              {t("th.tax")}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={postData.tax}
              name="tax"
              type="number"
              onChange={(e) =>
                setPostData({ ...postData, tax: e.target.value })
              }
            />
            <button className="bg-green-400 w-full text-white hover:bg-green-500 cursor-pointer my-5">
              {t("button.save")}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ModalView;
