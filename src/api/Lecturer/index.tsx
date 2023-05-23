import axios from 'axios';

type Lecturer1 = {
  [key: string]: any; // 👈️ variable key
  name: string;
};

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

export const editBioProfile = async (data: any, accountId: string | null) => {
  const res = await axios.put(
    `${BASE_URL}lecturers/${accountId}/update`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        "id": data.id,
        "name": data.name,
        "gender": data.gender,
        "avatar": data.avatar,
        "dateOfBirth": data.dateOfBirth,
        "bio": data.bio,
        "academicRankId": data.academicRankId,
        "academicRankGainYear": data.academicRankGainYear,
        "academicTitleId": data.academicTitleId,
        "academicTitleGainYear": data.academicTitleGainYear
      }
    }
  );
};

export const editInfoProfile = async (data: any, accountId: string | null) => {
  const { lecturer, newUniversity, newCurrentDisciplines, newGender, newDateOfBirth, newDepartmentName, newEmail, newAddress, newPhone } = data;
  console.log({ lecturer, newUniversity, newCurrentDisciplines, newGender, newDateOfBirth, newDepartmentName, newEmail, newAddress, newPhone });
  const res = await axios.put(
    `${BASE_URL}lecturers/${accountId}/update`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        "id": lecturer.id,
        "name": lecturer.name,
        "gender": newGender,
        "avatar": lecturer.avatar,
        "dateOfBirth": newDateOfBirth,
        "bio": lecturer.bio,
        "academicRankId": lecturer.academicRankId,
        "academicRankGainYear": lecturer.academicRankGainYear,
        "academicTitleId": lecturer.academicTitleId,
        "academicTitleGainYear": lecturer.academicTitleGainYear
      }
    }
  );
};

export const editAvatarProfile = async (AvatarURL: string, accountId: string | null) => {
  const res = await axios.put(
    `${BASE_URL}lecturers/${accountId}/update`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        "avatar": `${AvatarURL}`
      }
    }
  );
};

