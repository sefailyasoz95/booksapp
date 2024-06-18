import { useEffect } from "react";
import { motion } from "framer-motion";
import useToast from "../Utils/Hooks/useToast";
import { useAppDispatch, useAppSelector } from "../Utils/Redux/store";
import Loading from "../Components/Loading";

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
		<div className='w-7xl h-screen flex items-center justify-center'>
			{loading && <Loading />}
			<motion.nav
				initial={{ opacity: 0, y: -50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.8,
					ease: "easeInOut",
				}}
				className='lg:w-10/12 w-11/12 rounded-2xl bg-gradient-to-br from-green-500 to-green-900 fixed top-5 shadow-black shadow-lg'>
				<div className='w-full backdrop-blur-md rounded-2xl flex flex-row items-center justify-between px-5 py-2'>
					<div>
						<span className='text-xl font-semibold tracking-widest'>Booked</span>
					</div>
					<div className='group cursor-pointer'>
						<span className='text-lg font-semibold'>Get Started</span>
						<div className='h-0.5 w-0 group-hover:w-full transition-all bg-white'></div>
					</div>
				</div>
			</motion.nav>
			<div className='lg:w-10/12 w-11/12 lg:mt-0 mt-48 overflow-hidden rounded-2xl flex flex-col border-gray-400 bg-black shadow-xl shadow-black lg:h-3/4 h-screen'>
				<div className='flex lg:flex-row pt-5 lg:pt-0 flex-col items-center w-full justify-center'>
					<motion.div
						initial={{ opacity: 0, x: -190 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{
							duration: 1,
							ease: "easeInOut",
						}}
						className='flex flex-col items-center w-fit text-green-500'>
						<span className='text-5xl tracking-wider font-semibold'>Welcome!</span>
						<span className=''>
							<span className='text-sm font-semibold tracking-widest'>Chat-Si</span>
							<span>&nbsp;is a chat bot with high capabilities, try now!</span>
						</span>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
