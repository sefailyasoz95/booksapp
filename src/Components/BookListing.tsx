import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../Utils/Redux/store";
import Loading from "../Components/Loading";
import { getBooks } from "../Utils/Redux/actions";
type Props = {};

const BookListing = (props: Props) => {
	const { books, loading } = useAppSelector((state) => state.global);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getBooks());
	}, []);

	return loading ? (
		<div></div>
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
				<motion.div
					key={index}
					className='xl:w-[30%] lg:w-[31%] md:w-[45%] w-[75%] h-96 xl:mx-3 self-center mx-1 my-2 rounded-lg'
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{
						duration: 0.8,
						ease: "easeInOut",
						delay: index * 0.15,
					}}>
					<div className='text-center flex flex-col items-center justify-between w-full rounded-lg h-full border-2 border-white hover:border-black standart-transition cursor-pointer book-inner-container'>
						<img src={book.image} className='h-80 object-contain mx-auto' />
						<span className='text-sm font-medium'>{book.title}</span>
						<div className='absolute-modal standart-transition'>
							<span>{book.price}</span>
						</div>
					</div>
				</motion.div>
			))}
		</motion.div>
	);
};

export default BookListing;
