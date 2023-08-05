import {$host} from "./index";

export const createCustomers = async (customers) => {
    const {data} = await $host.post('api/customers', customers)
    return data
}

export const deleteCustomer = async (id) => {
    const {data} = await $host.delete('api/customers/' + id)
    return data
}

export const fetchCustomers = async () => {
    try {
        const response = await $host.get('api/customers');
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

export const fetchOneCustomer = async (id) => {
    const {data} = await $host.get('api/customers/' + id)
    return data
}