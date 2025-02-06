import React from 'react';

const UserScore = (props) => {
	return (
		<div className='flex flex-col mb-2 items-center'>
			<p>
				{props.userName} - {props.score} / {props.questionsLength.toString()}
			</p>

			<div className='w-24 h-2 rounded-full relative bg-slate-950 dark:bg-slate-200 overflow-hidden'>
				<div
					className='absolute bg-orange-500 h-8 shadow shadow-5xl shadow-orange-500'
					style={{
						width: `${(props.score / props.questionsLength) * 100}%`,
					}}
				></div>
			</div>
		</div>
	);
};

export default UserScore;
