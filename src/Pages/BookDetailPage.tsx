import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Utils/Redux/store";
import { getBookDetailsById } from "../Utils/Redux/actions";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Loading from "../Components/Loading";
import useToast from "../Utils/Hooks/useToast";

type Props = {};

const BookDetailPage = (props: Props) => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { showToast } = useToast();
	const { loading, bookDetail } = useAppSelector((state) => state.global);
	useEffect(() => {
		let timeout: any = undefined;
		if (location.state) dispatch(getBookDetailsById(location.state));
		else {
			showToast({ type: "error", message: "Seems like you came here by mistake!" });
			timeout = setTimeout(() => {
				navigate("/");
			}, 1000);
		}
		return () => {
			clearTimeout(timeout);
		};
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
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{
				duration: 0.8,
				ease: "easeInOut",
			}}
			className='lg:w-10/12 w-11/12 gap-y-3 lg:px-0 px-2 h-screen rounded-2xl mt-5 bg-white drop-shadow-lg mx-auto flex flex-col items-center py-5'>
			{location.state ? (
				<>
					<div className='w-full px-5 flex flex-row items-center justify-between'>
						<Link to={"/"}>
							<ChevronLeftIcon className='w-7 h-7 standart-transition' />
						</Link>
						<span className='font-bold text-lg tracking-wide'>{bookDetail?.title}</span>
						<div className='w-7 h-7' />
					</div>
					<img src={bookDetail?.image} className='h-1/2 object-contain aspect-square' />
					{bookDetail?.subtitle && (
						<span>
							<b>Subtitle: </b> {bookDetail?.subtitle}
						</span>
					)}
					<span className='text-center'>
						<b>Description: </b> <span dangerouslySetInnerHTML={{ __html: bookDetail?.description! }} />
					</span>
					<span>
						<b>Authors: </b> {bookDetail?.authors}
					</span>
					<span>
						<b>Pages: </b> {bookDetail?.pages}
					</span>
					<span>
						<b>Year: </b> {bookDetail?.year}
					</span>
					<span>
						<b>Publisher: </b> {bookDetail?.publisher}
					</span>
				</>
			) : (
				<span>Seems like you came here by mistake!</span>
			)}
		</motion.div>
	);
};

export default BookDetailPage;
