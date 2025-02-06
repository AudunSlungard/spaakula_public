import React, { useEffect, useState } from 'react';

const Question = (props) => {
	const [answer, setAnswer] = useState();

	const handleYesAnswer = (e) => {
		if (e.target.checked) {
			document.getElementById('yes-' + props.question.id).checked = true;
			document.getElementById('no-' + props.question.id).checked = false;
			setAnswer(true);
			props.setAnswers((prev) => {
				const existingAnswerIndex = prev.findIndex(
					(answer) => answer.questionID === props.question.id
				);
				if (existingAnswerIndex !== -1) {
					const updatedAnswers = [...prev];
					updatedAnswers[existingAnswerIndex].answer = true;
					return updatedAnswers;
				} else {
					return [...prev, { questionID: props.question.id, answer: true }];
				}
			});
		}
	};

	const handleNoAnswer = (e) => {
		if (e.target.checked) {
			document.getElementById('yes-' + props.question.id).checked = false;
			document.getElementById('no-' + props.question.id).checked = true;
			setAnswer(false);
			props.setAnswers((prev) => {
				const existingAnswerIndex = prev.findIndex(
					(answer) => answer.questionID === props.question.id
				);
				if (existingAnswerIndex !== -1) {
					const updatedAnswers = [...prev];
					updatedAnswers[existingAnswerIndex].answer = false;
					return updatedAnswers;
				} else {
					return [...prev, { questionID: props.question.id, answer: false }];
				}
			});
		}
	};

	return (
		<div className='w-full flex gap-8 mb-4 border-b border-orange-500 pb-2'>
			<div className='w-2/3 flex justify-start'>
				<p className='text-left'>
					{props.lang == 'no'
						? props.question.questionNo
						: props.question.questionEn}
				</p>
			</div>

			<div className='flex justify-center items-center gap-2 h-full'>
				<input
					className='outline-none focus:ring-2 focus:ring-orange-500'
					type='checkbox'
					value={answer}
					onChange={(e) => {
						handleYesAnswer(e);
					}}
					id={'yes-' + props.question.id}
				/>
				<label htmlFor={'yes-' + props.question.id}>
					{props.lang == 'no' ? 'Ja' : 'Yes'}
				</label>
			</div>
			<div className='flex justify-center items-center gap-2 h-full'>
				<input
					className='outline-none focus:ring-2 focus:ring-orange-500'
					type='checkbox'
					value={!answer}
					onChange={(e) => {
						handleNoAnswer(e);
					}}
					id={'no-' + props.question.id}
				/>
				<label htmlFor={'no-' + props.question.id}>
					{props.lang == 'no' ? 'Nei' : 'No'}
				</label>
			</div>
		</div>
	);
};

export default Question;
