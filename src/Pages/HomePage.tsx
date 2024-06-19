import { useEffect } from "react";
import useToast from "../Utils/Hooks/useToast";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../Utils/Redux/store";
import Loading from "../Components/Loading";
import { ShoppingCartIcon, BookOpenIcon } from "@heroicons/react/24/solid";
import BookListing from "../Components/BookListing";
type Props = {};

const HomePage = (props: Props) => {
	const { showToast } = useToast();
	const dispatch = useAppDispatch();

	const { loading, error, success, message } = useAppSelector((state) => state.global);

	useEffect(() => {
		if (!loading) {
			if (error) showToast({ type: "error", message });
			if (success) showToast({ type: "error", message });
		}
	}, [loading, error, success]);

	return (
		<div className='w-7xl h-screen flex items-center flex-col'>
			<motion.nav
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.8,
					ease: "easeInOut",
				}}
				className='lg:w-10/12 w-11/12 mt-5 rounded-2xl bg-white drop-shadow-lg'>
				<div className='w-full rounded-2xl flex flex-row items-center justify-between px-5 py-2'>
					<div>
						<span className='text-xl font-semibold tracking-widest'>Booked</span>
					</div>
					<div className='group cursor-pointer'>
						<div className='flex flex-row items-center gap-x-2'>
							<ShoppingCartIcon className='w-7 h-7' />
							<span>0</span>
						</div>
						<div className='h-0.5 w-0 group-hover:w-full transition-all bg-white'></div>
					</div>
				</div>
			</motion.nav>
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
						<b>20% OFF</b> on your 2nd item!
					</span>
					<BookOpenIcon className='w-10 h-10' />
				</div>
			</motion.div>
			<BookListing />
		</div>
	);
};

export default HomePage;
