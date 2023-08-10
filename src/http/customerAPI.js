import { $host } from "./index";

export const createCustomers = async (customer) => {
  try {
    const response = await $host.post("/api/customers/", customer);
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

export const deleteCustomer = async (id) => {
  try {
    const response = await $host.delete("api/customers/" + id);
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

export const fetchCustomers = async () => {
  try {
    const response = await $host.get("api/customers");
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

export const fetchOneCustomer = async (id) => {
  try {
    const response = await $host.get("api/customers/" + id);
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
