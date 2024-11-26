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
export const ShowAllPayroll = async () => {
    try {
      const response = await instance.get('/payroll');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };

  export const DeleteEmployee = async (id) => {
    try {
      const response = await instance.delete('/payroll/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreatePayroll = async (formdata) => {
    try {
      const response = await instance.post('/sammry',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdateEmployees = async (formdata , id) => {
    try {
      const response = await instance.post('/payroll/'+id+'/update',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };