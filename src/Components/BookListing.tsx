import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../Utils/Redux/store";
import Loading from "../Components/Loading";
import { getBooks } from "../Utils/Redux/actions";
import ListItem from "./ListItem";
type Props = {};

const BookListing = (props: Props) => {
	const { books, loading } = useAppSelector((state) => state.global);
	const dispatch = useAppDispatch();
	useEffect(() => {
		books.length === 0 && dispatch(getBooks());
	}, []);

	return loading ? (
		<motion.div
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{
				duration: 0.8,
				ease: "easeInOut",
			}}
			className='flex lg:w-10/12 w-11/12 mt-5 h-screen drop-shadow-lg items-center justify-center bg-white rounded-2xl'>
			<Loading />
		</motion.div>
	) : (
		<motion.div
			initial={{ opacity: 0, x: 150 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{
				duration: 0.8,
				ease: "easeInOut",
			}}
			className='lg:w-10/12 w-11/12 flex-wrap rounded-2xl mt-5 bg-white drop-shadow-lg flex items-center py-5 justify-center'>
			{books.map((book, index) => (
				<ListItem book={book} index={index} key={index} />
			))}
		</motion.div>
	);
};

export default BookListing;
