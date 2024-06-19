import { motion } from "framer-motion";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
type Props = {};

const Loading = (props: Props) => {
	return <ArrowPathIcon className='animate-spin text-4xl w-10 h-10' />;
};

export default Loading;
