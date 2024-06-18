export type BookType = {
	id: string;
	title: string;
	subtitle: string;
	authors: string;
	image: string;
	url: string;
};

export type InitialState = {
	loading: boolean;
	message: string;
	error: boolean;
	success: boolean;
	books: Array<BookType>;
};
