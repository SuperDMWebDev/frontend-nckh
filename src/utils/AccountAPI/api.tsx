import axios from 'axios';
const URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

export interface DataResponse {
  code: number;
  message: string;
}
export interface Response {
  status: number;
  data: DataResponse;
}
export const deleteAccount = async () => {
  const response: Response = await axios.delete(
    `${URL}/accounts/1 HTTP/1.1`
  );
  console.log('response ', response);
  return response;
};
