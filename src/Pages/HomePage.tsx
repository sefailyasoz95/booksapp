import { useEffect } from "react";
import useToast from "../Utils/Hooks/useToast";
import { motion } from "framer-motion";
import { useAppSelector } from "../Utils/Redux/store";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import BookListing from "../Components/BookListing";

type Props = {};

const HomePage = (props: Props) => {
	const { showToast } = useToast();
	const { loading, error, success, message } = useAppSelector((state) => state.global);

	useEffect(() => {
		if (!loading) {
			if (error) showToast({ type: "error", message });
			if (success) showToast({ type: "error", message });
		}
	}, [loading, error, success]);

	return (
		<div className='w-7xl flex items-center flex-col h-fit'>
			<motion.div
				initial={{ opacity: 0, x: -150 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{
					duration: 0.8,
					ease: "easeInOut",
				}}
				className='lg:w-10/12 w-11/12 gap-y-3 rounded-2xl mt-5 py-5 px-3 bg-white drop-shadow-lg flex flex-col items-center justify-center'>
				<span className='text-3xl border-b-2 border-black'>More you buy, more you earn!</span>
				<div className='flex items-center justify-center'>
					<BookOpenIcon className='w-10 h-10' />
					<span className='text-3xl'>
						<b>20% OFF</b> at the checkout if you buy more than 2 books!
					</span>
					<BookOpenIcon className='w-10 h-10' />
				</div>
			</motion.div>
			<BookListing />
		</div>
	);
};

export default HomePage;
