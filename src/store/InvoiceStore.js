import { makeAutoObservable } from "mobx";

export default class InvoiceStore {
    constructor() {
        this._invoices = []
        
        makeAutoObservable(this)
    }

    setInvoices(invoices) {
        this._invoices = invoices
    }

    getInvoices() {
        return this._invoices
    }
}
