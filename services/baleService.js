import { api } from "./api/apiService";

export const fetchBaleList = async () => {
  try {
    const response = await api.get('bale');
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
export const fetchBaleMaterial = async () => {
  try {
    const response = await api.get('bale/baleMaterial');
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
export const fetchBaleDropdownList = async () => {
  try {
    const response = await api.get('bale/baleDropdownList');
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
