import { makeAutoObservable } from "mobx"; //control obj and render it if it changed
import { $host } from "Http/index";

export default class CustomerStore {
  constructor() {
    this._customers = [];

    makeAutoObservable(this);
  }

  setCustomers (customers) {
    this._customers = customers;
  };

  getCustomers() {
    return this._customers;
  }

  createCustomer = async (customer) => {
    const response = await $host.post("/api/customers/", customer);
    const data = response.data;
    return data;
  };

  deleteCustomer = async (id) => {
    const response = await $host.delete("api/customers/" + id);
    const data = response.data;
    return data;
  };

  fetchCustomers = async () => {
    const response = await $host.get("api/customers");
    const data = response.data;
    return data;
  };

  fetchOneCustomer = async (id) => {
    const response = await $host.get("api/customers/" + id);
    const data = response.data;
    return data;
  };
}
