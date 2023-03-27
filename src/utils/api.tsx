import axios from 'axios';
const URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export interface Response {
  data: any;
  status: number;
}
export const loginUser = async (username: String, password: String) => {
  const response: Response = await axios.post(`${URL}/auth/login`, {
    username,
    password
  });
  return response;
};
