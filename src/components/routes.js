import React from "react";
import CustomersPage from "../pages/CustomersPage";
import InvoicesPage from "../pages/InvoicesPage";
import ProductsPage from "../pages/ProductsPage";
import {
  CUSTOMERS_ROUTE,
  INVOICES_ROUTE,
  PRODUCTS_ROUTE,
} from "../utils/constants";
import EditInvoicePage from "../pages/EditInvoicePage";

export const routes = [
  {
    path: INVOICES_ROUTE + "/:id",
    element: <EditInvoicePage />,
  },

  {
    path: CUSTOMERS_ROUTE,
    element: <CustomersPage />,
  },

  {
    path: INVOICES_ROUTE,
    element: <InvoicesPage />,
  },

  {
    path: PRODUCTS_ROUTE,
    element: <ProductsPage />,
  },
];
