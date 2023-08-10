import React, { createContext } from "react";
import CustomerStore from "Store/CustomerStore";
import ProductStore from "Store/ProductStore";
import InvoiceStore from "Store/InvoiceStore";
import ItemsStore from "Store/ItemsStore";
import App from "./App";
import { createRoot } from "react-dom/client";

export const Context = createContext(null);
const rootElement = document.getElementById("root");

const root = createRoot(rootElement);
root.render(
  <Context.Provider
    value={{
      customers: new CustomerStore(),
      products: new ProductStore(),
      invoices: new InvoiceStore(),
      items: new ItemsStore(),
    }}
  >
    <App />
  </Context.Provider>
);
