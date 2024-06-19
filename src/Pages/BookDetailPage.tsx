import React from "react";
import { useLocation } from "react-router-dom";

type Props = {};

const BookDetailPage = (props: Props) => {
	const location = useLocation();

	return <div>BookDetailPage {location.pathname}</div>;
};

export default BookDetailPage;
