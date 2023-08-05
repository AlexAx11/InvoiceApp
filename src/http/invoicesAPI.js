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
    try {
        const response = await $host.get('/api/invoices');
        const data = response.data;
        
        if (data.message === 'success') {
          return data.data;
        } else {
          console.error('Data error:', data.message);
          return [];
        }
      } catch (error) {
        console.error('Data error:', error);
        return [];
      }
}

export const fetchOneInvoice = async (id) => {
    const {data} = await $host.get('/api/invoices/' + id)
    return data
}

export const putOneInvoice = async (id, invoice) => {
    const {data} = await $host.put('/api/invoices/' + id, invoice)
    return data
}