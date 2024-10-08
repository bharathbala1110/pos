import {api} from './api/apiService';

export const fetchPurchaseList = async () => {
  try {
    const response = await api.get('purchase');
    return response.data; // Assuming response is an array of purchase orders
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Error response from server:', error.response.data);
      console.error('Status code:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error setting up request:', error.message);
    }
    throw error; // Re-throw the error for the caller to handle
  }
};
export const postNewPurchase = async data => {
  try {
    console.log('services', data);

    const response = await api.post('purchase', data);
    return response.data;
  } catch (e) {
    throw e;
  }
};
export const postFile = async data => {
  try {
    console.log('services', data);
    const response = await api.post('purchase/upload', data);
    console.log('api result', response);
    return response.data;
  } catch (e) {
    throw e;
  }
};
export const getSupplierList = async () => {
  try {
    const response = await api.get('supplier');
    console.log('api');
    return response.data;
  } catch (e) {
    throw e;
  }
};
export const getMaterialList = async () => {
  try {
    const response = await api.get('purchase/purchaseMaterial');
    //  console.log(response.data)
    return response.data;
  } catch (e) {
    throw e;
  }
};
