import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { addItemToCart, deleteItemFromCart } from "../Utils/Redux/reducers";
import { useAppDispatch, useAppSelector } from "../Utils/Redux/store";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { BookType } from "../Utils/types";
import { useNavigate } from "react-router-dom";
import useToast from "../Utils/Hooks/useToast";

type Props = {
	book: BookType;
	index: number;
};

const ListItem = ({ book, index }: Props) => {
	const { books, loading, shoppingCart } = useAppSelector((state) => state.global);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { showToast } = useToast();
	const quantityInCart = useMemo(() => {
		const itemIndex = shoppingCart.findIndex((item) => item.item.id === book.id);
		if (itemIndex < 0) {
			return 0;
		} else {
			return shoppingCart[itemIndex]?.quantity ?? 0;
		}
	}, [shoppingCart]);
	const handleQuantityDecrease = () => {
		const itemIndex = shoppingCart.findIndex((item) => item.item.id === book.id);
		if (shoppingCart[itemIndex].quantity === 1) {
			dispatch(deleteItemFromCart(book.id));
		} else {
			dispatch(addItemToCart({ item: book, quantity: -1 }));
		}
	};
	const handleQuantityIncrease = () => {
		dispatch(addItemToCart({ item: book, quantity: 1 }));
	};
	const handleNavigate = () =>
		navigate(`/book/${book.title.toLocaleLowerCase().replaceAll(" ", "-")}`, { state: book.id });
	return (
		<motion.div
			className='xl:w-[30%] lg:w-[31%] md:w-[45%] w-[75%] h-96 xl:mx-3 self-center mx-1 my-2 rounded-lg'
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{
				duration: 0.8,
				ease: "easeInOut",
				delay: index * 0.15,
			}}>
			<div className='text-center relative flex flex-col xl:flex-row overflow-hidden items-center justify-between w-full rounded-lg h-full bg-white drop-shadow-lg hover:drop-shadow-xl standart-transition cursor-pointer book-inner-container'>
				<img
					src={book.image}
					className='2xl:w-60 w-48 object-contain hover:scale-105 standart-transition rounded-xl 2xl:ml-2'
					onClick={handleNavigate}
				/>
				<div className='flex flex-col items-center justify-around h-full'>
					<span className='xl:text-xl text-sm font-semibold text-green-800 w-3/4' onClick={handleNavigate}>
						{book.title}
					</span>
					<div className='flex flex-row xl:flex-col items-center justify-between gap-x-2 2xl:gap-x-0'>
						<div className='backdrop-blur-md px-2 text-gray-500 rounded-lg overflow-hidden font-semibold'>
							{book.price.toFixed(2)}$
						</div>
						{quantityInCart > 0 ? (
							<div className='border-green-700 text-green-700 drop-shadow-xl w-28 flex py-0.5 flex-row items-center justify-between rounded-xl border-2'>
								<button className='standart-transition hover:rotate-360' onClick={handleQuantityDecrease}>
									<MinusCircleIcon className='w-7 h-7' />
								</button>
								<span className='text-lg font-semibold'>{quantityInCart}</span>
								<button className='standart-transition hover:rotate-360' onClick={handleQuantityIncrease}>
									<PlusCircleIcon className='w-7 h-7' />
								</button>
							</div>
						) : (
							<button
								className='hover:bg-green-700 bg-white text-green-700 standart-transition border-green-700 border-2 hover:text-white text-lg font-semibold rounded-xl w-28 py-0.5'
								onClick={() => {
									dispatch(addItemToCart({ item: book, quantity: 1 }));
									showToast({ type: "success", message: `${book.title} added to cart!` });
								}}>
								Add to Cart
							</button>
						)}
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default ListItem;
