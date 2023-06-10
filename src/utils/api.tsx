import axios from 'axios';
const URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';

export interface DataResponse {
  code: number;
  message: string;
  token: string;
  expire: string;
  accountId: string;
  role: string;
  lecturerInfo: any;
}
export interface Response {
  status: number;
  data: DataResponse;
}
const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers':
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    'Access-Control-Allow-Credentials': 'credentials'
  }
};
export const loginUser = async (email: string, password: string) => {
  const response: Response = await axios.post(
    `${URL}/auth/login`,
    {
      email,
      password
    },
    config
  );

  return response;
};

export const getLecturerIdFromAccountId = async (accountId: string) => {
  const response: any = await axios.get(`${URL}/lecturers/account/${accountId}`);

  return response;
};
