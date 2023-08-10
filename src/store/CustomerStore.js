import { makeAutoObservable } from "mobx"; //control obj and render it if it changed

export default class CustomerStore {
  constructor() {
    this._customers = [];

    makeAutoObservable(this);
  }

  setCustomers(customers) {
    this._customers = customers;
  }

  getCustomers() {
    return this._customers;
  }
}
