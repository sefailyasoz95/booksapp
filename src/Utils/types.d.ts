import { HttpStatusCode } from "axios";

export type APIResponseType<T> = {
	data: T;
	status: HttpStatusCode;
};
export type BookType = {
	id: string;
	title: string;
	subtitle: string;
	authors: string;
	image: string;
	url: string;
	price: number;
	soldOut: boolean;
};

export type DetailedBookType = {
	status: string;
	id: string;
	title: string;
	subtitle: string;
	description: string;
	authors: string;
	publisher: string;
	pages: string;
	year: string;
	image: string;
	url: string;
	download: string;
};
export type ShoppingCartItemType = {
	item: BookType;
	quantity: number;
};
export type InitialState = {
	loading: boolean;
	message: string;
	error: boolean;
	success: boolean;
	books: Array<BookType>;
	filteredBooks?: Array<BookType>;
	bookDetail?: DetailedBookType;
	shoppingCart: Array<ShoppingCartItemType>;
};
