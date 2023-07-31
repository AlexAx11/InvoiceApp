import {$host} from "./index";

export const createProduct = async (products) => {
    const {data} = await $host.post('/api/products', products)
    return data
}

export const deleteProduct = async (id) => {
    const {data} = await $host.delete('/api/products/' + id)
    return data
}

export const fetchProducts = async () => {
    const {data} = await $host.get('/api/products')
    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('/api/products/' + id)
    return data
}