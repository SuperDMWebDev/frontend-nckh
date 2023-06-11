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

///
// Contact type
export const getAllContactTypes = async () => {
  try {
    const res = await axios.get(`${BASE_URL}configs/contact-type/fetch-all`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

// eslint-disable-next-line no-shadow
export const createMultipleContactTypes = async (data: any) => {
  try {
    const res = await axios.post(`${BASE_URL}configs/contact-type/create`, data);
    return res.data.code;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteMultipleContactTypes = async (data: any) => {
  try {
    const res = await axios.delete(`${BASE_URL}configs/contact-type/delete`, data);
    return res.data.code;
  } catch (error) {
    return handleError(error);
  }
};

export const updateContactType = async (data: any) => {
  try {
    const res = await axios.put(`${BASE_URL}configs/contact-type/:${data.id}/update`, data);
    return res.data.code;
  } catch (error) {
    return handleError(error);
  }
};

///
// Academic rank
export const getAllAcademicRanks = async () => {
  try {
    const res = await axios.get(`${BASE_URL}configs/academic-rank/fetch-all`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

// eslint-disable-next-line no-shadow
export const createMultipleAcademicRanks = async (data: any) => {
  try {
    const res = await axios.post(`${BASE_URL}configs/academic-rank/create`, data);
    return res.data.code;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteMultipleAcademicRanks = async (data: any) => {
  try {
    const res = await axios.delete(`${BASE_URL}configs/academic-rank/delete`, data);
    return res.data.code;
  } catch (error) {
    return handleError(error);
  }
};

export const updateAcademicRank = async (data: any) => {
  try {
    const res = await axios.put(`${BASE_URL}configs/academic-rank/:${data.id}/update`, data);
    return res.data.code;
  } catch (error) {
    return handleError(error);
  }
};

///
// Academic title
export const getAllAcademicTitles = async () => {
  try {
    const res = await axios.get(`${BASE_URL}configs/academic-title/fetch-all`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

// eslint-disable-next-line no-shadow
export const createMultipleAcademicTitles = async (data: any) => {
  try {
    const res = await axios.post(`${BASE_URL}configs/academic-title/create`, data);
    return res.data.code;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteMultipleAcademicTitles = async (data: any) => {
  try {
    const res = await axios.delete(`${BASE_URL}configs/academic-title/delete`, data);
    return res.data.code;
  } catch (error) {
    return handleError(error);
  }
};

export const updateAcademicTitle = async (data: any) => {
  try {
    const res = await axios.put(`${BASE_URL}configs/academic-title/:${data.id}/update`, data);
    return res.data.code;
  } catch (error) {
    return handleError(error);
  }
};

///
// Activity type
export const getAllActivities = async () => {
  try {
    const res = await axios.get(`${BASE_URL}configs/activity-type/fetch-all`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

// eslint-disable-next-line no-shadow
export const createMultipleActivities = async (data: any) => {
  try {
    const res = await axios.post(`${BASE_URL}configs/activity-type/create`, data);
    return res.data.code;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteMultipleActivities = async (data: any) => {
  try {
    const res = await axios.delete(`${BASE_URL}configs/activity-type/delete`, data);
    return res.data.code;
  } catch (error) {
    return handleError(error);
  }
};

export const updateActivity = async (data: any) => {
  try {
    const res = await axios.put(`${BASE_URL}configs/activity-type/:${data.id}/update`, data);
    return res.data.code;
  } catch (error) {
    return handleError(error);
  }
};

///
// University
export const getAllUniversities = async () => {
  try {
    const res = await axios.get(`${BASE_URL}configs/university/fetch-all`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

// eslint-disable-next-line no-shadow
export const createMultipleUniversities = async (data: any) => {
  try {
    const res = await axios.post(`${BASE_URL}configs/university/create`, data);
    return res.data.code;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteMultipleUniversities = async (data: any) => {
  try {
    const res = await axios.delete(`${BASE_URL}configs/university/delete`, data);
    return res.data.code;
  } catch (error) {
    return handleError(error);
  }
};

export const updateUniversity = async (data: any) => {
  try {
    const res = await axios.put(`${BASE_URL}configs/university/:${data.id}/update`, data);
    return res.data.code;
  } catch (error) {
    return handleError(error);
  }
};
