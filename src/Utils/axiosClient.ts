import axios from "axios";
import { BOOKS_API_URL } from "./constants";

export const axiosClient = axios.create({
	baseURL: BOOKS_API_URL,
});
