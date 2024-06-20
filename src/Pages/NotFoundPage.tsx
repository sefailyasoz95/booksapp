import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const NotFoundPage = (props: Props) => {
	const navigate = useNavigate();
	useEffect(() => {
		const timeout = setTimeout(() => {
			navigate("/");
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<div className='w-7xl h-screen flex items-center justify-center'>
			<span className='text-4xl'>What you're looking for is not here, sorry!</span>
		</div>
	);
};

export default NotFoundPage;
