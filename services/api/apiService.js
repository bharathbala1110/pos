
import axios from "axios";

export const api = axios.create({
    baseURL: 'http://192.168.1.10:2000/api/',
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar',}
  });