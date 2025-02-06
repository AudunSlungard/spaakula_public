import React from 'react';

const UserAnswers = (props) => {
	const makeQuestionsAndAnswersArray = () => {
		let arr = [];

		props.questions.forEach((question) => {
			props.answers.forEach((answer) => {
				if (answer.userID === props.userID) {
					answer.answers.forEach((ans) => {
						if (ans.questionID === question.id) {
							arr.push({
								questionNo: question.questionNo,
								questionEn: question.questionEn,
								answer: ans.answer,
							});
						}
					});
				}
			});
		});

		return arr;
	};

	return (
		<div className='w-full h-full bg-slate-200 dark:bg-slate-950 text-slate-900 dark:text-slate-200 flex flex-col justify-center items-center'>
			<h1 className='text-xl'>
				{props.lang === 'no' ? 'Dine svar' : 'Your answers'}
			</h1>
			{makeQuestionsAndAnswersArray().length > 0 ? (
				<table className='w-full my-12 w-11/12 md:w-2/3 lg:w-1/2'>
					<thead>
						<tr className='bg-slate-300  dark:bg-slate-800 text-slate-950 dark:text-slate-200'>
							<th>
								<h2 className='text-left py-2 px-2 md:px-8'>
									{props.lang === 'no' ? 'Spørsmål' : 'Questions'}
								</h2>
							</th>
							<th>
								<h2 className='text-nowrap text-left p-2'>
									{props.lang === 'no' ? 'Dine svar' : 'Your answer'}
								</h2>
							</th>
						</tr>
					</thead>
					<tbody className=''>
						{makeQuestionsAndAnswersArray().map((qa, index) => (
							<tr
								key={index}
								className={
									index % 2 === 0
										? 'bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-slate-200'
										: 'bg-slate-300  dark:bg-slate-800 text-slate-950 dark:text-slate-200'
								}
							>
								<td className='py-2 px-2 md:px-8'>
									{props.lang === 'no' ? qa.questionNo : qa.questionEn}
								</td>
								<td className='py-2 px-2 md:px-8'>
									{qa.answer
										? props.lang === 'no'
											? 'Ja'
											: 'Yes'
										: props.lang === 'no'
										? 'Nei'
										: 'No'}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<h2 className='infotext mt-12'>
					{props.lang === 'no'
						? 'Her var det ingenting...'
						: 'Nothing here yet...'}
				</h2>
			)}
		</div>
	);
};

export default UserAnswers;
