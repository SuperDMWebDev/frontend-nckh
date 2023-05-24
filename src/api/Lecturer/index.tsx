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

export const getInfoProfile = async (accountId: string | null) => {
  const res = await axios.get(`${BASE_URL}lecturers/detail/${accountId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data.data[0];
};

export const getScopusAuthors = async (firstnam: string, lastname: string) => {
  const res = await axios.get(
    `${BASE_URL}scopus/author?firstName=${firstnam}&lastName=${lastname}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
};

export const getAllLecturers = async () => {
  try {
    const query = `${BASE_URL}lecturers/fetch-all`;
    const res = await axios.get(query);
    return res;
  } catch (error) {
    return handleError(error);
  }
};
