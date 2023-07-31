import axios from 'axios';
import { HTTP } from 'Http/const'

const $host = axios.create({
    baseURL: HTTP
})

export {$host}