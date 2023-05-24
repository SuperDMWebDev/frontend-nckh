import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/v1/';

const token = localStorage.getItem('accessToken');

const handleError = (error: any) => {
  const { response, message } = error;
  if (response) {
    return response;
  }
  return message;
};

export const getAllAccounts = async () => {
    try {
        const res = await axios.get(`${BASE_URL}accounts`);
        return res.data.data;
    } catch (error) {
        return handleError(error);
    }
};
