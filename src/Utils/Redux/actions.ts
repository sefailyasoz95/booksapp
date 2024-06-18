import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "../types";
import { LoginService } from "./services";

export const login = createAsyncThunk("auth/login", async (data: UserType, thunkAPI) => {
	try {
		return await LoginService(data);
	} catch (error: any) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
