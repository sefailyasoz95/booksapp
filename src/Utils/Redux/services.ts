import axios, { HttpStatusCode } from "axios";
import { axiosClient } from "../axiosClient";

export const GetBooksService = async () => {
	try {
		const response = await axiosClient.get("");
		return {
			data: response.data.books,
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
		const response = await axios.get(`https://www.dbooks.org/api/book/${id}`);
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
