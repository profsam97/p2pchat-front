'use server'
import { baseUrl } from "@/base/baseUrl";
import axios from "axios"; 
export async function createUser(data : IRegister) {

    try {
        const reponse = await axios.post(`${baseUrl}api/auth/signup`, data);

        return reponse.data

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data?.message || 'Email or number already exists';
            throw new Error(errorMessage);
        }
        throw new Error('Something went wrong, please try again.');
    }

}

export async function loginUser(data : ILogin) {

    try {
        const reponse = await axios.post(`${baseUrl}api/auth/login`, data);

        return reponse.data

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data?.message || 'Failed to login';
            throw new Error(errorMessage);
        }
        throw new Error('Something went wrong, please try again.');
    }

}