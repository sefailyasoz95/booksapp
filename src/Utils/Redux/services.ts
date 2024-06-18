import { axiosClient } from "../axiosClient";
import { UserType } from "../types";

export const LoginService = async (data: UserType) => {
	try {
		const response = await axiosClient.post("/users", data);
		return {
			data: response.data,
			status: response.status,
		};
	} catch (error) {
		return {
			data: undefined,
			status: 400,
		};
	}
};
