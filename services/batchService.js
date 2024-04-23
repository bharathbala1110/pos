import { api } from "./api/apiService";

export const fetchBatchList = async () => {
  try {
    const response = await api.get('batch');
    return response.data; // Assuming response is an array of purchase orders
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Error response from server:", error.response.data);
      console.error("Status code:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Error setting up request:", error.message);
    }
    throw error; // Re-throw the error for the caller to handle
  }
};
export const fetchMaterialList = async () => {
  try {
    const response = await api.get('batch/materialList');
    return response.data; // Assuming response is an array of purchase orders
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Error response from server:", error.response.data);
      console.error("Status code:", error.response.status);
    } else if (error.request) {
      // The request was made but no respo  nse was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Error setting up request:", error.message);
    }
    throw error; // Re-throw the error for the caller to handle
  }
};
export const postBatch = async (data) => {
  try {
    const response = await api.post('batch',data);
    return response.data; 
  } catch (error) {
    if (error.response) {
     
      console.error("Error response from server:", error.response.data);
      console.error("Status code:", error.response.status);
    } else if (error.request) {
      
      console.error("No response received:", error.request);
    } else {
      
      console.error("Error setting up request:", error.message);
    }
    throw error; 
  }
};