import axios from 'axios';
const token=  localStorage.getItem('AgriCapital_token');
const instance = axios.create({
  baseURL: 'https://apisystem.agricapital-eg.com/api/v1', 
  headers: {
    'Content-Type': 'multipart/form-data',
    "Authorization": `Bearer ${token}`,
   
  }, withCredentials: true,
  // Replace with your Laravel backend URL
});
export const ShowAllGlobalholyday = async () => {
    try {
      const response = await instance.get('/globalholyday');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const showRequestfe = async (id) => {
    try {
      const response = await instance.get('/globalholyday/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };

  export const DeleteGlobalholyday = async (id) => {
    try {
      const response = await instance.delete('/globalholyday/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateGlobalholyday = async (formdata) => {
    try {
      const response = await instance.post('/globalholyday/create',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdateRequestfe = async (formdata , id) => {
    try {
      const response = await instance.post('/Requestfe/'+id+'/update',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
