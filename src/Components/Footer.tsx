import { motion } from "framer-motion";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
type Props = {};

const Footer = (props: Props) => {
	return (
		<motion.nav
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.8,
				ease: "easeInOut",
			}}
			className='lg:w-10/12 w-11/12 my-5 rounded-2xl bg-white drop-shadow-lg mx-auto'>
			<div className='w-full rounded-2xl xl:text-lg text-sm flex flex-row items-center justify-between px-5 py-2'>
				<div className='group cursor-pointer'>
					<span className='font-semibold'>By Sefa İlyas Öz</span>
					<div className='h-0.5 w-0 group-hover:w-full transition-all bg-black'></div>
				</div>
				<div className='flex flex-row items-center gap-x-2'>
					<div className='group cursor-pointer'>
						<a className='font-semibold' href='https://linkedin.com/in/sefailyasoz' target='_blank'>
							LinkedIn
						</a>
						<div className='h-0.5 w-0 group-hover:w-full transition-all bg-black'></div>
					</div>
					<div className='group cursor-pointer'>
						<a className='font-semibold' href='https://github.com/sefailyasoz95' target='_blank'>
							GitHub
						</a>
						<div className='h-0.5 w-0 group-hover:w-full transition-all bg-black'></div>
					</div>
				</div>
			</div>
		</motion.nav>
	);
};

export default Footer;
