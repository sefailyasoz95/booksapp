import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetBookDetailsByIdService, GetBooksService } from "./services";

export const getBooks = createAsyncThunk("app/getbooks", async (_, thunkAPI) => {
	try {
		return await GetBooksService();
	} catch (error: any) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const getBookDetailsById = createAsyncThunk("app/getBookDetailsById", async (id: string, thunkAPI) => {
	try {
		return await GetBookDetailsByIdService(id);
	} catch (error: any) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
