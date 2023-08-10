import { $host } from "./index";

export const createItem = async (invoice_id, item) => {
  try {
    const response = await $host.post(
      `/api/invoices/${invoice_id}/items/`,
      item
    );
    const data = response.data;

    if (data.message === "success") {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Data error:", error);
    return null;
  }
};

export const putItem = async (invoice_id, id, item) => {
  try {
    const response = await $host.patch(
      `/api/invoices/${invoice_id}/items/${id}`,
      item
    );
    const data = response.data;

    if (data.message === "success") {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Data error:", error);
    return null;
  }
};

export const deleteItem = async (id) => {
  const { data } = await $host.delete(`/api/invoices/${invoice_id}/items` + id);
  return data;
};

export const fetchItems = async (invoice_id) => {
  try {
    const response = await $host.get(`/api/invoices/${invoice_id}/items`);
    const data = response.data;

    if (data.message === "success") {
      return data.data;
    } else {
      console.error("Data error:", data.message);
      return [];
    }
  } catch (error) {
    console.error("Data error:", error);
    return [];
  }
};

export const fetchOneItem = async (id) => {
  const { data } = await $host.get(`/api/invoices/${invoice_id}/items` + id);
  return data;
};
