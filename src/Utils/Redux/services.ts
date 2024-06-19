import axios, { HttpStatusCode } from "axios";
import { axiosClient } from "../axiosClient";
import { BOOK_SEARCH_API_URL } from "../constants";

export const GetBooksService = async () => {
	try {
		const response = await axiosClient.get("");
		return {
			data: response.data,
			status: HttpStatusCode.Ok,
		};
	} catch (error) {
		return {
			data: undefined,
			status: HttpStatusCode.BadRequest,
		};
	}
};

export const GetBookDetailsByIdService = async (id: string) => {
	try {
		const response = await axios.get(`${BOOK_SEARCH_API_URL}${id}`);
		return {
			data: response.data,
			status: HttpStatusCode.Ok,
		};
	} catch (error) {
		return {
			data: undefined,
			status: HttpStatusCode.BadRequest,
		};
	}
};
