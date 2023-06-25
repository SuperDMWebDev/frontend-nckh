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
  const token = localStorage.getItem('accessToken');
  try {
    const res = await axios.get(`${BASE_URL}accounts`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res;
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

export const resetPassword = async (token: any, password: any) => {
  const res = await axios.post(`${BASE_URL}auth/forget-change-password`, {
    token,
    password
  });

  return res.data;
};

export const forgetPassword = async (email: any) => {
  const res = await axios.post(`${BASE_URL}auth/forget-password`, {
    email
  });

  return res.data;
};

export const retrieveScopusAccount = async (accountId: any, scopusId: any) => {
  const res = await axios.post(`${BASE_URL}scopus/author/save`, {
    data: {
      scopusAuthorId: scopusId,
      accountId: accountId
    }
  });

  return res.data;
};

export const signup = async (email: string) => {
  const res = await axios.post(`${BASE_URL}auth/signup`, {
    email: email,
    password: 'Nam12345678@',
    password2: 'Nam12345678@'
  });
  return res.data.code;
};

export const getEmailByAccountId = async (accountId: string) => {
  const res = await axios.get(`${BASE_URL}accounts/${accountId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data.data.email;
};

export const deleteAccount = async (accountId: string) => {
  const res = await axios.delete(`${BASE_URL}accounts/${accountId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data.code;
};
