import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, BookType, DetailedBookType, APIResponseType } from "../types";
import { getBookDetailsById, getBooks } from "./actions";
import { HttpStatusCode } from "axios";
const userInfo = localStorage.getItem("dontStoreUserInfoLikeThat");

export const initialState: InitialState = {
	error: false,
	success: false,
	message: "",
	books: [],
	loading: false,
	bookDetail: undefined,
};

export const reducer = createSlice({
	name: "global",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder // *********** Get Books START *********** \\
			.addCase(getBooks.pending, (state) => {
				state.loading = true;
			})
			.addCase(getBooks.fulfilled, (state, action: PayloadAction<APIResponseType<Array<BookType>>>) => {
				if (action.payload.status !== HttpStatusCode.BadRequest) {
					state.books = action.payload.data;
				} else {
					state.error = true;
				}
				state.loading = false;
				// *********** Get Books END *********** \\
			})
			// *********** Get Book Details By Id START *********** \\
			.addCase(getBookDetailsById.pending, (state) => {
				state.loading = true;
				state.bookDetail = undefined;
			})
			.addCase(getBookDetailsById.fulfilled, (state, action: PayloadAction<APIResponseType<DetailedBookType>>) => {
				if (action.payload.status !== HttpStatusCode.BadRequest) {
					state.bookDetail = action.payload.data;
				} else {
					state.error = true;
				}
				state.loading = false;
				// *********** Get Book Details By Id END *********** \\
			});
	},
});

export const {} = reducer.actions;

export default reducer.reducer;
