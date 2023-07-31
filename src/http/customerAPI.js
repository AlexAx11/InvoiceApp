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
    const {data} = await $host.get('api/customers')
    return data
}

export const fetchOneCustomer = async (id) => {
    const {data} = await $host.get('api/customers/' + id)
    return data
}