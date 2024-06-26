import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, BookType, DetailedBookType, APIResponseType, ShoppingCartItemType } from "../types";
import { getBookDetailsById, getBooks } from "./actions";
import { HttpStatusCode } from "axios";

export const initialState: InitialState = {
	error: false,
	success: false,
	message: "",
	books: [],
	loading: false,
	bookDetail: undefined,
	shoppingCart: [],
	filteredBooks: undefined,
};

export const reducer = createSlice({
	name: "global",
	initialState,
	reducers: {
		addItemToCart: (state, action: PayloadAction<ShoppingCartItemType>) => {
			const isExist = state.shoppingCart.findIndex((item) => item.item.id === action.payload.item.id);
			if (isExist > -1) {
				state.shoppingCart[isExist].quantity = state.shoppingCart[isExist].quantity + action.payload.quantity;
			} else {
				state.shoppingCart = [...state.shoppingCart, action.payload];
			}
		},
		deleteItemFromCart: (state, action: PayloadAction<string>) => {
			const filtered = state.shoppingCart.filter((item) => item.item.id !== action.payload);
			state.shoppingCart = filtered;
		},
		clearCartItems: (state) => {
			state.shoppingCart = [];
		},
		searchBook: (state, action: PayloadAction<string | undefined>) => {
			if (action.payload) {
				let filtered = state.books.filter(
					(item) =>
						item.authors.toLowerCase().includes(action.payload!.toLowerCase()) ||
						item.title.toLowerCase().includes(action.payload!.toLowerCase())
				);
				state.filteredBooks = filtered;
			} else {
				state.filteredBooks = undefined;
			}
		},
	},
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
					state.message = "Something went wrong while getting the book details!";
				}
				state.loading = false;
				// *********** Get Book Details By Id END *********** \\
			});
	},
});

export const { addItemToCart, deleteItemFromCart, clearCartItems, searchBook } = reducer.actions;

export default reducer.reducer;
