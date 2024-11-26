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
export const ShowAllQRcode = async () => {
    try {
      const response = await instance.get('/qrcode');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const showQRcode = async (id) => {
    try {
      const response = await instance.get('/qrcode/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };

  export const DeleteQRcode = async (id,formData) => {
    try {
      const response = await instance.delete('/qrcode/'+id,formData);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateQRcode = async (formdata) => {
    try {
      const response = await instance.post('/qrcode/create',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdateQRcodes = async (formdata , id) => {
    try {
      const response = await instance.post('/qrcode/'+id+'/update',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };