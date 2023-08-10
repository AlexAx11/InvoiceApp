import { makeAutoObservable } from "mobx";

export default class ItemsStore {
  constructor() {
    this._items = [];

    makeAutoObservable(this);
  }

  setItems(items) {
    this._items = items;
  }

  getItems() {
    return this._items;
  }
}
