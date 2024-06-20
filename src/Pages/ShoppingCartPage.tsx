import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Utils/Redux/store";
import { MinusCircleIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import useToast from "../Utils/Hooks/useToast";
import { addItemToCart, clearCartItems, deleteItemFromCart } from "../Utils/Redux/reducers";
import { BookType } from "../Utils/types";
import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
type Props = {};

const ShoppingCartPage = (props: Props) => {
	const { shoppingCart } = useAppSelector((state) => state.global);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [formStep, setFormStep] = useState<"cartDetails" | "checkout">("cartDetails");
	const { showToast } = useToast();
	const cartTotal = useMemo(() => {
		let discount = 0;
		let total = shoppingCart.reduce((accumulator, currentItem, index) => {
			const { item, quantity } = currentItem;
			const { price } = item;
			discount = (index > 1 ? price * 0.2 : 0) + discount;
			let _price = (index + 1) % 3 === 0 ? price - price * 0.2 : price;

			return accumulator + _price * quantity;
		}, 0);
		return { total, discount };
	}, [shoppingCart]);

	const handleQuantityDecrease = (book: BookType) => {
		const itemIndex = shoppingCart.findIndex((item) => item.item.id === book.id);
		if (shoppingCart[itemIndex].quantity === 1) {
			dispatch(deleteItemFromCart(book.id));
		} else {
			dispatch(addItemToCart({ item: book, quantity: -1 }));
		}
	};

	const handleQuantityIncrease = (book: BookType) => {
		dispatch(addItemToCart({ item: book, quantity: 1 }));
	};

	const handleBack = () => {
		formStep === "cartDetails" ? navigate("/") : setFormStep("cartDetails");
	};
	const onCheckoutSubmit = async (data: FieldValues) => {
		showToast({ message: "Your order has been received, thank you!", type: "success" });
		dispatch(clearCartItems());
		setTimeout(() => {
			navigate("/");
		}, 1000);
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{
				duration: 0.8,
				ease: "easeInOut",
			}}
			className='lg:w-10/12 w-11/12 gap-y-3 lg:px-0 px-2 min-h-screen rounded-2xl mt-5 bg-white h-fit drop-shadow-lg mx-auto flex flex-col items-center py-5'>
			<div className='w-full px-5 flex flex-row items-center justify-between'>
				<button onClick={handleBack}>
					<ChevronLeftIcon className='w-7 h-7 standart-transition' />
				</button>
			</div>
			{shoppingCart.length === 0 ? (
				<span>You have no items in your cart!</span>
			) : (
				<AnimatePresence>
					<motion.div
						key={"cart-details"}
						initial={{ opacity: 0, x: -200 }}
						animate={formStep === "cartDetails" ? { opacity: 1, x: 0 } : { opacity: 0, x: -200 }}
						transition={{
							duration: 0.5,
							ease: "easeInOut",
							delay: formStep === "cartDetails" ? 0.5 : 0,
						}}
						className='xl:w-1/2 lg:w-2/3 w-full'>
						<span className='font-bold text-lg tracking-wide'>Your Cart Details</span>
						<div className='border-b-2 border-b-black pb-5'>
							{shoppingCart.map((item, index) => (
								<div key={index} className='flex bg-white drop-shadow-lg px-2 py-1 rounded-xl my-3'>
									<img src={item.item.image} alt={item.item.title} className='w-36 aspect-square object-contain' />
									<div className='flex flex-col w-full justify-between'>
										<div className='flex flex-col gap-x-2'>
											<span className='font-semibold'>{item.item.title}</span>
											<span className='text-gray-500 font-medium'>{item.item.price.toFixed(2)}$</span>
										</div>
										<div className=' text-green-700 self-end drop-shadow-xl w-28 flex py-0.5 flex-row items-center justify-between'>
											<button
												className='standart-transition hover:rotate-360'
												onClick={() => {
													dispatch(deleteItemFromCart(item.item.id));
													showToast({ message: `${item.item.title} removed from the cart`, type: "success" });
												}}>
												<TrashIcon className='w-7 h-7 text-red-600' />
											</button>
											<button
												className='standart-transition hover:rotate-360'
												onClick={() => handleQuantityDecrease(item.item)}>
												<MinusCircleIcon className='w-7 h-7' />
											</button>
											<span className='text-lg font-semibold'>{item.quantity}</span>
											<button
												className='standart-transition hover:rotate-360'
												onClick={() => handleQuantityIncrease(item.item)}>
												<PlusCircleIcon className='w-7 h-7' />
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className='flex items-center gap-x-10 mt-5 w-full justify-between'>
							<div className='flex flex-col'>
								{cartTotal.discount > 0 && (
									<span className='text-red-600'>
										<b>Subtotal:</b> {(cartTotal.total + cartTotal.discount).toFixed(2)}$
									</span>
								)}
								{cartTotal.discount > 0 && (
									<span className='text-red-600'>
										<b>Discount:</b> {cartTotal.discount.toFixed(2)}$
									</span>
								)}
								<span className='text-xl'>
									<b>Grand Total:</b> {cartTotal.total.toFixed(2)}$
								</span>
							</div>
							<button
								className='animate-shimmer transition-colors self-center px-7 drop-shadow-lg text-white font-medium text-xl py-1 rounded-lg bg-[linear-gradient(110deg,#000103,45%,#4f5a6e,55%,#000103)] bg-[length:200%_100%]'
								onClick={() => setFormStep("checkout")}>
								Checkout
							</button>
						</div>
					</motion.div>
					<motion.div
						key={"checkout"}
						initial={{ opacity: 0, x: 200, zIndex: -20 }}
						animate={
							formStep === "cartDetails" ? { opacity: 0, x: 200, zIndex: -20 } : { opacity: 1, x: 0, zIndex: 20 }
						}
						transition={{
							duration: 0.5,
							ease: "easeInOut",
							delay: formStep === "checkout" ? 0.5 : 0,
						}}
						className={`absolute top-24 xl:w-1/2 lg:w-2/3 w-full flex items-center justify-center`}>
						<form className='pb-5 w-full gap-y-5 flex flex-col items-center' onSubmit={handleSubmit(onCheckoutSubmit)}>
							<code>
								<small>Currently we only accept payments at the door</small>
							</code>
							<input
								{...register("fullName", { required: "This field is required" })}
								placeholder='Name Surname'
								name='fullName'
								className={`px-2 py-1 border-2 rounded-xl w-1/2 outline-none right-0 border-black focus:border-green-700 standart-transition ${
									errors?.email && "border-red-600 animate-shake"
								}`}
							/>
							<input
								{...register("email", { required: "This field is required" })}
								placeholder='Email'
								name='email'
								type='email'
								className={`px-2 py-1 border-2 rounded-xl w-1/2 outline-none right-0 border-black focus:border-green-700 standart-transition ${
									errors.email && "border-red-600 animate-shake"
								}`}
							/>
							<input
								{...register("address", { required: "This field is required" })}
								placeholder='Address'
								name='address'
								className={`px-2 py-1 border-2 rounded-xl w-1/2 outline-none right-0 border-black focus:border-green-700 standart-transition ${
									errors.address && "border-red-600 animate-shake"
								}`}
							/>
							<span className='text-xl'>
								<b>You will pay:</b> {cartTotal.total.toFixed(2)}$
							</span>
							<button
								type='submit'
								className='animate-shimmer transition-colors self-center px-7 drop-shadow-lg text-white font-medium text-xl py-1 rounded-lg bg-[linear-gradient(110deg,#000103,45%,#4f5a6e,55%,#000103)] bg-[length:200%_100%]'>
								Confirm Order
							</button>
						</form>
					</motion.div>
				</AnimatePresence>
			)}
		</motion.div>
	);
};

export default ShoppingCartPage;
