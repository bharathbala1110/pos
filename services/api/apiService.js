
import axios from "axios";

export const api = axios.create({
    baseURL: 'http://192.168.1.15:2000/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });