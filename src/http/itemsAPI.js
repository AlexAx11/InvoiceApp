import {$host} from "./index";

export const createItem = async (invoice_id, item) => {
    const {data} = await $host.post('/api/invoices' + '/' + invoice_id + '/' + 'items', item)
    return data
}

export const putItem = async (invoice_id, id, item) => {
    const {data} = await $host.put('/api/invoices/' + invoice_id + '/items/' + id, item)
    return data
}

export const deleteItem = async (id) => {
    const {data} = await $host.delete('/api/invoices/:invoice_id/items/' + id)
    return data
}

export const fetchItems = async (invoice_id) => {
    const {data} = await $host.get('/api/invoices' + '/' + invoice_id + '/' + 'items')
    return data
}

export const fetchOneInvoice = async (id) => {
    const {data} = await $host.get('/api/invoices/:invoice_id/items/' + id)
    return data
}