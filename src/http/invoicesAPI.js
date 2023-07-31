import {$host} from "./index";

export const createInvoices = async (invoices) => {
    const {data} = await $host.post('/api/invoices', invoices)
    return data
}

export const deleteInvoice = async (id) => {
    const {data} = await $host.delete('/api/invoices/' + id)
    return data
}

export const fetchInvoices = async () => {
    const {data} = await $host.get('/api/invoices')
    return data
}

export const fetchOneInvoice = async (id) => {
    const {data} = await $host.get('/api/invoices/' + id)
    return data
}

export const putOneInvoice = async (id, invoice) => {
    const {data} = await $host.put('/api/invoices/' + id, invoice)
    return data
}