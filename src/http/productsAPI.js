import { $host } from "./index";

export const createProduct = async (products) => {
  const { data } = await $host.post("/api/products", products);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await $host.delete("/api/products/" + id);
  return data;
};

export const fetchProducts = async () => {
  try {
    const response = await $host.get("/api/products");
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

export const fetchOneProduct = async (id) => {
  const { data } = await $host.get("/api/products/" + id);
  return data;
};
