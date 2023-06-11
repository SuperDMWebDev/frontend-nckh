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

export const getInfoProfile = async (lecturerId: string | null) => {
  const res = await axios.get(`${BASE_URL}lecturers/detail/${lecturerId}`, {
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

export const getListLecturerWithKeyword = async (data: any) => {
  try {
    const query = `${BASE_URL}${data.searchOption}/fetch?pageOffset=1&limitSize=10&keyword=${data.keyword}`;
    const res = await axios.get(query);

    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const editBioProfile = async (data: any, accountId: string | null) => {
  const res = await axios.put(`${BASE_URL}lecturers/${accountId}/update`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      id: data.id,
      name: data.name,
      gender: data.gender,
      avatar: data.avatar,
      dateOfBirth: '04/05/1979',
      bio: data.bio,
      academicRankId: data.academicRankId,
      academicRankGainYear: data.academicRankGainYear,
      academicTitleId: data.academicTitleId,
      academicTitleGainYear: data.academicTitleGainYear
    }
  });
};

export const editInfoProfile = async (lecturer: any, data: any, accountId: string | null) => {
  const res = await axios.put(`${BASE_URL}lecturers/${accountId}/update`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      id: lecturer.id,
      name: lecturer.name,
      gender: data.newGender,
      avatar: lecturer.avatar,
      dateOfBirth: data.newDateOfBirth,
      bio: lecturer.bio,
      academicRankId: lecturer.academicRankId,
      academicRankGainYear: lecturer.academicRankGainYear,
      academicTitleId: lecturer.academicTitleId,
      academicTitleGainYear: lecturer.academicTitleGainYear,
      contacts: [
        {
          id: 1,
          contactTypeId: 1,
          value: data.email.email,
          update: true
        },
        {
          id: 2,
          contactTypeId: 2,
          value: data.address.address,
          update: true
        },
        {
          id: 3,
          contactTypeId: 3,
          value: data.phone.phone,
          update: true
        }
      ],
      currentDiscipline: {
        id: lecturer.currentDisciplines[0].id,
        lecturerId: accountId,
        departmentName: data.newDepartmentName,
        universityId: data.newUniversity,
        position: data.newCurrentDisciplines,
        update: true
      }
    }
  });
};

export const editNameProfile = async (
  lecturer: any,
  newName: string | undefined,
  accountId: string | null
) => {
  const res = await axios.put(`${BASE_URL}lecturers/${accountId}/update`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      id: lecturer.id,
      name: newName,
      gender: lecturer.gender,
      avatar: lecturer.avatar,
      dateOfBirth: lecturer.dateOfBirth,
      bio: lecturer.bio,
      academicRankId: lecturer.academicRankId,
      academicRankGainYear: lecturer.academicRankGainYear,
      academicTitleId: lecturer.academicTitleId,
      academicTitleGainYear: lecturer.academicTitleGainYear
    }
  });
};

export const addNewBook = async (lecturer: any, newBook: any, accountId: string | null) => {
  const res = await axios.put(`${BASE_URL}lecturers/${accountId}/update`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      id: lecturer.id,
      name: lecturer.name,
      gender: lecturer.gender,
      avatar: lecturer.avatar,
      dateOfBirth: lecturer.dateOfBirth,
      bio: lecturer.bio,
      academicRankId: lecturer.academicRankId,
      academicRankGainYear: lecturer.academicRankGainYear,
      academicTitleId: lecturer.academicTitleId,
      academicTitleGainYear: lecturer.academicTitleGainYear,
      books: [
        {
          name: newBook.name,
          publisherName: 'IEEE CPS, ISBN-13; 978',
          publicYear: newBook.publicYear,
          coAuthors: newBook.coAuthors,
          create: true
        }
      ]
    }
  });
};

export const createDegree = async (lecturer: any, data: any, accountId: string | null) => {
  const res = await axios.put(`${BASE_URL}lecturers/${accountId}/update`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      id: lecturer.id,
      name: lecturer.name,
      gender: lecturer.gender,
      avatar: lecturer.avatar,
      dateOfBirth: lecturer.dateOfBirth,
      bio: lecturer.bio,
      academicRankId: lecturer.academicRankId,
      academicRankGainYear: lecturer.academicRankGainYear,
      academicTitleId: lecturer.academicTitleId,
      academicTitleGainYear: lecturer.academicTitleGainYear,
      degrees: [
        {
          create: true,
          academicTitleId: 1,
          universityId: data.universityId,
          specialization: data.specialization,
          graduationDate: data.graduationDate,
          graduationThesisName: data.graduationThesisName
        }
      ]
    }
  });
};

export const deleteDegree = async (lecturer: any, idDegree: any, accountId: string | null) => {
  const res = await axios.put(`${BASE_URL}lecturers/${accountId}/update`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      id: lecturer.id,
      name: lecturer.name,
      gender: lecturer.gender,
      avatar: lecturer.avatar,
      dateOfBirth: lecturer.dateOfBirth,
      bio: lecturer.bio,
      academicRankId: lecturer.academicRankId,
      academicRankGainYear: lecturer.academicRankGainYear,
      academicTitleId: lecturer.academicTitleId,
      academicTitleGainYear: lecturer.academicTitleGainYear,
      degrees: [
        {
          id: idDegree,
          delete: true
        }
      ]
    }
  });
};

export const editDegree = async (lecturer: any, data: any, accountId: string | null) => {
  const res = await axios.put(`${BASE_URL}lecturers/${accountId}/update`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      id: lecturer.id,
      name: lecturer.name,
      gender: lecturer.gender,
      avatar: lecturer.avatar,
      dateOfBirth: lecturer.dateOfBirth,
      bio: lecturer.bio,
      academicRankId: lecturer.academicRankId,
      academicRankGainYear: lecturer.academicRankGainYear,
      academicTitleId: lecturer.academicTitleId,
      academicTitleGainYear: lecturer.academicTitleGainYear,
      degrees: [
        {
          update: true,
          id: data.id,
          specialization: data.specialization,
          universityId: data.universityId,
          graduationDate: data.graduationDate,
          academicTitleId: 1,
          graduationThesisName: data.graduationThesisName
        }
      ]
    }
  });
};

export const editWorkPosition = async (lecturer: any, data: any, accountId: string | null) => {
  const res = await axios.put(`${BASE_URL}lecturers/${accountId}/update`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      id: lecturer.id,
      name: lecturer.name,
      gender: lecturer.gender,
      avatar: lecturer.avatar,
      dateOfBirth: lecturer.dateOfBirth,
      bio: lecturer.bio,
      academicRankId: lecturer.academicRankId,
      academicRankGainYear: lecturer.academicRankGainYear,
      academicTitleId: lecturer.academicTitleId,
      academicTitleGainYear: lecturer.academicTitleGainYear,
      workPositions: [
        {
          id: data.id,
          update: true,
          universityId: 3,
          position: data.position,
          fromDate: data.fromDate,
          toDate: data.toDate,
          isNow: data.isNow
        }
      ]
    }
  });
};

export const updateBook = async (lecturer: any, book: any, accountId: string | null) => {
  const res = await axios.put(`${BASE_URL}lecturers/${accountId}/update`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      id: lecturer.id,
      name: lecturer.name,
      gender: lecturer.gender,
      avatar: lecturer.avatar,
      dateOfBirth: lecturer.dateOfBirth,
      bio: lecturer.bio,
      academicRankId: lecturer.academicRankId,
      academicRankGainYear: lecturer.academicRankGainYear,
      academicTitleId: lecturer.academicTitleId,
      academicTitleGainYear: lecturer.academicTitleGainYear,
      books: [
        {
          id: book.id,
          name: book.name,
          publisherName: 'IEEE CPS, ISBN-13; 978',
          publicYear: book.publicYear,
          coAuthors: book.coAuthors,
          update: true
        }
      ]
    }
  });
};

export const deleteBook = async (lecturer: any, idBook: any, accountId: string | null) => {
  const res = await axios.put(`${BASE_URL}lecturers/${accountId}/update`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      id: lecturer.id,
      name: lecturer.name,
      gender: lecturer.gender,
      avatar: lecturer.avatar,
      dateOfBirth: lecturer.dateOfBirth,
      bio: lecturer.bio,
      academicRankId: lecturer.academicRankId,
      academicRankGainYear: lecturer.academicRankGainYear,
      academicTitleId: lecturer.academicTitleId,
      academicTitleGainYear: lecturer.academicTitleGainYear,
      books: [
        {
          id: idBook,
          delete: true
        }
      ]
    }
  });
};

export const editExpertises = async (lecturer: any, data: any, accountId: string | null) => {
  const res = await axios.put(`${BASE_URL}lecturers/${accountId}/update`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      id: lecturer.id,
      name: lecturer.name,
      gender: lecturer.gender,
      avatar: lecturer.avatar,
      dateOfBirth: lecturer.dateOfBirth,
      bio: lecturer.bio,
      academicRankId: lecturer.academicRankId,
      academicRankGainYear: lecturer.academicRankGainYear,
      academicTitleId: lecturer.academicTitleId,
      academicTitleGainYear: lecturer.academicTitleGainYear,
      expertises: [
        {
          id: lecturer.expertises[0].id,
          lecturerId: accountId,
          title: 'Lĩnh vực',
          specialization: data.field,
          update: true
        },
        {
          id: lecturer.expertises[1].id,
          lecturerId: accountId,
          title: 'Chuyên ngành',
          specialization: data.specialized,
          update: true
        }
      ]
    }
  });
};

export const editResearchField = async (lecturer: any, data: any, accountId: string | null) => {
  const res = await axios.put(`${BASE_URL}lecturers/${accountId}/update`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      id: lecturer.id,
      name: lecturer.name,
      gender: lecturer.gender,
      avatar: lecturer.avatar,
      dateOfBirth: lecturer.dateOfBirth,
      bio: lecturer.bio,
      academicRankId: lecturer.academicRankId,
      academicRankGainYear: lecturer.academicRankGainYear,
      academicTitleId: lecturer.academicTitleId,
      academicTitleGainYear: lecturer.academicTitleGainYear,
      researchFields: [
        {
          id: data.id,
          update: true,
          researchName: data.researchName,
          note: data.note
        }
      ]
    }
  });
};

export const createResearchField = async (lecturer: any, data: any, accountId: string | null) => {
  const res = await axios.put(`${BASE_URL}lecturers/${accountId}/update`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      id: lecturer.id,
      name: lecturer.name,
      gender: lecturer.gender,
      avatar: lecturer.avatar,
      dateOfBirth: lecturer.dateOfBirth,
      bio: lecturer.bio,
      academicRankId: lecturer.academicRankId,
      academicRankGainYear: lecturer.academicRankGainYear,
      academicTitleId: lecturer.academicTitleId,
      academicTitleGainYear: lecturer.academicTitleGainYear,
      researchFields: [
        {
          create: true,
          researchName: data.researchName,
          note: data.note
        }
      ]
    }
  });
};

export const createLecturer = async (data: any) => {
  const res = await axios.put(`${BASE_URL}lecturers/create`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      name: data.name,
      gender: data.gender,
      avatar: null,
      bio: null,
      dateOfBirth: '18/03/2001',
      academicRankId: 1,
      academicRankGainYear: '2010',
      academicTitleId: 1,
      academicTitleGainYear: '2022',
      expandColumn: null
    }
  });
};

export const editAvatarProfile = async (
  lecturer: any,
  AvatarURL: string,
  accountId: string | null
) => {
  const res = await axios.put(`${BASE_URL}lecturers/${accountId}/update`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      id: lecturer.id,
      name: lecturer.name,
      gender: lecturer.gender,
      avatar: `${AvatarURL}`,
      dateOfBirth: lecturer.dateOfBirth,
      bio: lecturer.bio,
      academicRankId: lecturer.academicRankId,
      academicRankGainYear: lecturer.academicRankGainYear,
      academicTitleId: lecturer.academicTitleId,
      academicTitleGainYear: lecturer.academicTitleGainYear
    }
  });
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

// Get all university
export const getAllUniversity = async () => {
  try {
    const query = `${BASE_URL}configs/university/fetch-all`;
    const res = await axios.get(query);
    return res;
  } catch (error) {
    return handleError(error);
  }
};

// Get all contact type
export const getAllContactType = async () => {
  try {
    const query = `${BASE_URL}configs/contact-type/fetch-all`;
    const res = await axios.get(query);
    return res;
  } catch (error) {
    return handleError(error);
  }
};

// Get all Academic Title
export const getAllAcademicTitle = async () => {
  try {
    const query = `${BASE_URL}configs/academic-title/fetch-all`;
    const res = await axios.get(query);
    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const getListLecturers = async () => {
  try {
    const query = `${BASE_URL}lecturers/fetch?pageOffset=1&limitSize=10`;
    const res = await axios.get(query);
    return res;
  } catch (error) {
    return handleError(error);
  }
};
