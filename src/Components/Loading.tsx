import React from "react";

type Props = {};

const Loading = (props: Props) => {
	return (
		<div className='fixed z-40 bg-gray-800 bg-opacity-50 left-0 top-0 flex w-screen h-screen items-center justify-center'>
			<span className='animate-pulse text-4xl font-bold text-green-500'>Loading</span>
		</div>
	);
};

export default Loading;
