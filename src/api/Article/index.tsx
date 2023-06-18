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

export const getArticles = async () => {
  try {
    const query = `${BASE_URL}articles/fetch?pageOffset=1&limitSize=1`;
    const res = await axios.get(query);

    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const exportExcelArticles = async (year: any) => {
  try {
    const query = `${BASE_URL}articles/fetch?pageOffset=1&limitSize=9&isExport=true&fromYear=${year}`;
    const res = await axios.get(query);

    window.open(res.config.url, '_blank');
  } catch (error) {
    return handleError(error);
  }
};

export const getArticlesOfLecturers = async (data: any) => {
  try {
    const query = `${BASE_URL}articles/fetch-all`;
    const res = await axios.post(query, data);

    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const getDetailArticle = async (id: any) => {
  try {
    const query = `${BASE_URL}articles/detail/${id}`;
    const res = await axios.get(query);

    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const createArticle = async (data: any) => {
  try {
    const query = `${BASE_URL}articles/create`;
    const res = await axios.post(query, data, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    });

    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const updateArticle = async (data: any, id: any) => {
  try {
    const query = `${BASE_URL}articles/${id}/update`;
    const res = await axios.put(query, data);

    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteArticle = async (data: any) => {
  try {
    const query = `${BASE_URL}articles/delete`;
    const res = await axios.delete(query, data);

    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const getListArticleWithKeyword = async (data: any) => {
  try {
    const universityIds = data?.universityIds.join(',');
    let query = `${BASE_URL}${data.searchOption}/fetch?pageOffset=1&limitSize=10&keyword=${data.keyword}&sort=${data?.sort}&universityIds=${universityIds}`;

    const res = await axios.get(query);

    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const getArticleByDOI = async (data: any) => {
  try {
    const query = `${BASE_URL}scopus/article`;
    const res = await axios.post(query, data);

    return res;
  } catch (error) {
    return handleError(error);
  }
};
