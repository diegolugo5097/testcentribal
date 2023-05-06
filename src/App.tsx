import { useState } from "react";
import "./App.css";
import { Order } from "./domain/models/Order";
import { Product } from "./domain/models/Product";
import { orderService } from "./domain/services/order.services";
import { ProductList } from "./infrastructure/components/ProductList";
import { RecoilRoot } from "recoil";
import ModalOrders from "./infrastructure/components/ModalOrders";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import es from "./i18n/es/global.json";
import en from "./i18n/en/global.json";
import esFlag from "./assets/espana.png";
import enFlag from "./assets/1200px-United-kingdom_flag_icon_round.svg.png";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "es",
  resources: {
    es: {
      global: es,
    },
    en: {
      global: en,
    },
  },
});

function App() {
  const [order, setOrder] = useState<Order | null>(null);

  const changeLanguage = (lng: string) => {
    i18next.changeLanguage(lng);
  };

  const handleAddToCart = (product: Product) => {
    setOrder(orderService.addProductToOrder(product, order));
  };

  return (
    <RecoilRoot>
      <I18nextProvider i18n={i18next}>
        <div className="App">
          <div className="flex gap-5 m-10">
            <button onClick={() => changeLanguage("es")}>
              <img src={esFlag} alt="es" width={32} height={32} />
            </button>
            <button onClick={() => changeLanguage("en")}>
              <img src={enFlag} alt="en" width={28} height={28} />
            </button>
          </div>
          <ModalOrders order={order} />
          <ProductList onSelectProduct={handleAddToCart} />
        </div>
      </I18nextProvider>
    </RecoilRoot>
  );
}

export default App;
