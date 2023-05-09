import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

const token = localStorage.getItem('accessToken');

const handleError = (error: any) => {
  const { response, message } = error;
  if (response) {
    return response;
  }
  return message;
};

export const createArticle = async (data: any) => {
  try {
    const query = `${BASE_URL}/articles/create`;
    const res = await axios.post(query, data);

    console.log('createa article', res);
    return res;
  } catch (error) {
    return handleError(error);
  }
};
