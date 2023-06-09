import axios from 'axios';
import { BASE_URL } from '..';

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

export const createAccount = async (account_create: any) => {
  const res = await axios.post(`${BASE_URL}auth/signup`, {
    email: account_create.email,
    password: account_create.password,
    password2: account_create.password
  });
};

export const retrieveScopusAccount = async (accountId: any, scopusId: any) => {
  const res = await axios.post(`${BASE_URL}scopus/author/save`, {
    data: {
      scopusAuthorId: scopusId,
      accountId: accountId
    }
  });
};

export const signup = async (email: string) => {
  const res = await axios.post(`${BASE_URL}auth/signup`, {
    email: email,
    password: 'Nam12345678@',
    password2: 'Nam12345678@'
  });
};
