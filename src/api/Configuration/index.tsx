import axios from "axios";

const BASE_URL = 'http://localhost:3001/api/v1/';

const token = localStorage.getItem("accessToken");

const handleError = (error: any) => {
    const { response, message } = error;
    if (response) {
        return response;
    }
    return message;
};

export const getAllContactTypes = async () => {
    try {
        const res = await axios.get(`${BASE_URL}configs/contact-type/fetch-all`);
        return res;
    } catch (error) {
        return handleError(error);
    }

    // const res = await axios.get(`${BASE_URL}configs/contact-type/fetch-all`, {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // });

    // return res.data.data;
};

// eslint-disable-next-line no-shadow
export const createMultipleContactTypes = async (data: any) => {
    try {
        const res = await axios.post(`${BASE_URL}configs/contact-type/create`, data);

        console.log(data);
        return res;
    } catch (error) {
        return handleError(error);
    }
};

export const deleteMultipleContactTypes = async (data: any) => {
    try {
        const res = await axios.delete(`${BASE_URL}configs/contact-type/delete`, data);

        console.log(data);
        return res;
    } catch (error) {
        return handleError(error);
    }
};
