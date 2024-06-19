import { motion } from "framer-motion";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "../Utils/Redux/store";
import { useNavigate } from "react-router-dom";
type Props = {};

const Navbar = (props: Props) => {
	const { shoppingCart } = useAppSelector((state) => state.global);
	const navigate = useNavigate();
	const handleNavigate = () => {
		navigate("/shopping-cart");
	};
	return (
		<motion.nav
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.8,
				ease: "easeInOut",
			}}
			className='lg:w-10/12 w-11/12 mt-5 rounded-2xl bg-white drop-shadow-lg mx-auto'>
			<div className='w-full rounded-2xl flex flex-row items-center justify-between px-5 py-2'>
				<div className='flex flex-row items-center'>
					<span className='text-xl font-semibold tracking-widest'>Booked</span>
					<BookOpenIcon className='w-6 h-6' />
				</div>
				<div className='group cursor-pointer' onClick={handleNavigate}>
					<div className='flex flex-row items-center gap-x-2'>
						<ShoppingCartIcon className='w-7 h-7' />
						<span>{shoppingCart.length}</span>
					</div>
					<div className='h-0.5 w-0 group-hover:w-full transition-all bg-black'></div>
				</div>
			</div>
		</motion.nav>
	);
};

export default Navbar;
