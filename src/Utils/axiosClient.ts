import axios from "axios";

export const axiosClient = axios.create({
	baseURL: BOOKS_API_URL,
});
