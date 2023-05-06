import React from "react";
import Modal from "react-modal";
import { Order } from "../../domain/models/Order";
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

const ModalOrders = (props: { order: Order | null }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [t, _] = useTranslation("global");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const getTotalPriceNoTax = props.order?.items.map((order) =>
    parseInt(order.price)
  );

  const getTotalPriceTax = props.order?.items.map(
    (order) => parseInt(order.tax) + parseInt(order.price)
  );

  let totalNoTax = getTotalPriceNoTax?.reduce((a, b) => a + b, 0);
  let totalTax = getTotalPriceTax?.reduce((a, b) => a + b, 0);

  return (
    <div className="">
      <button
        onClick={openModal}
        className="bg-white px-4 py-3 rounded border-2 hover:bg-gray-200"
      >
        {t("button.seeOrder")} - {props.order?.items.length}
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
            {t("label.orderTitle")}
          </label>
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
                  {t("th.tax")}
                </th>
              </tr>
            </thead>
            <tbody>
              {props.order?.items?.map((order, index) => (
                <tr
                  className="hover:bg-gray-50 cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium dark:bg-gray-700 dark:text-gray-400 text-gray-900 whitespace-nowrap"
                  >
                    {order.reference}
                  </th>
                  <td className="px-6 py-4">{order.title}</td>
                  <td className="px-6 py-4">{order.description}</td>
                  <td className="px-6 py-4">$ {order.price}</td>
                  <td className="px-6 py-4">{order.tax}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between my-5">
            <label className="mx-20">
              {t("label.totalNoTax")} $ {totalNoTax}
            </label>
            <label className="mx-20">
              {t("label.totalTax")}: $ {totalTax}
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalOrders;
