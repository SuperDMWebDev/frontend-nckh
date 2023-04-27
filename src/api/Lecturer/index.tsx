import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

const token = localStorage.getItem('accessToken');

const handleError = (error: any) => {
  const { response, message } = error;
  if (response) {
    return response;
  }
  return message;
};

export const getInfoProfile = async () => {
  const res = await axios.get(`${BASE_URL}/lecturers/fetch?pageOffset=1&limitSize=2`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log('lecturers: ', JSON.parse(res.data.data));
  return JSON.parse(res.data.data);
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
