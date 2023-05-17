import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/v1';

const token = localStorage.getItem('accessToken');

const handleError = (error: any) => {
  const { response, message } = error;
  if (response) {
    return response;
  }
  return message;
};

export const getTag = async () => {
  try {
    const query = `${BASE_URL}/configs/tag/fetch-all`;
    const res = await axios.get(query);
    return res;
  } catch (error) {
    return handleError(error);
  }
};
