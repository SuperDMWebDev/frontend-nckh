import axios from "axios";

const BASE_URL = 'http://localhost:3001/api/v1/';

const token = localStorage.getItem("accessToken");

export const getInfoProfile = async () => {
    const res = await axios.get(`${BASE_URL}lecturers/fetch?pageOffset=1&limitSize=2`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data.data[0];
}
