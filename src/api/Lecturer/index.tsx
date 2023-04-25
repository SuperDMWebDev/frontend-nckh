import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/';

const token = localStorage.getItem('accessToken');

export const getInfoProfile = async () => {
  const res = await axios.get(`${BASE_URL}lecturers/fetch?pageOffset=1&limitSize=2`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log('lecturers: ', JSON.parse(res.data.data));
  return JSON.parse(res.data.data);
};
