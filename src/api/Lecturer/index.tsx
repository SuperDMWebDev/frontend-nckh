import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/v1/';

export const getInfoProfile = async () => {
    const res = await axios.get(`${BASE_URL}lecturers/fetch?pageOffset=1&limitSize=2`, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOjAuMTg0ODk1MjE4NjAxODgyNjMsInJvbGUiOjEsImlhdCI6MTY4MTkxNjY3NywiZXhwIjoxNjgxOTIwMjc3fQ.SMO80k1hxeXydWpzXVaplcSwdGj_-9p5_HLmaoLY308'
        }
    });

    console.log(JSON.parse(res.data.data));
    return JSON.parse(res.data.data);
}
