import React, { useState, useEffect } from 'react';
import UserScore from './UserScore';

const Scoreboard = (props) => {
	const userAnswersArray = props.answers;
	const [scores, setScores] = useState([]);

	const createScoreArray = async () => {
		let scoresIntermedaiary = [];

		let scoresFinal = [];

		userAnswersArray.forEach((a) => {
			scoresIntermedaiary.push({
				userID: a.userID,
				userName: a.userName,
				answers: a.answers,
			});
		});

		scoresIntermedaiary.forEach((user) => {
			let answers = [];
			let userID = user.userID;
			let userName = user.userName;

			user.answers.forEach((answer) => {
				props.questions.forEach((question) => {
					if (question.id === answer.questionID) {
						answers.push({
							[question.id]: {
								correctAnswer: question.correctAnswer,
								userAnswer: answer.answer,
							},
						});
					}
				});
			});
			scoresFinal.push({
				userID: userID,
				userName: userName,
				answers: answers,
				score: 0,
			});
		});

		scoresFinal.forEach((score) => {
			let intermediaryScore = 0;
			score.answers.forEach((answer) => {
				if (
					answer[Object.keys(answer)].userAnswer == true &&
					answer[Object.keys(answer)].correctAnswer == 'yes'
				) {
					intermediaryScore++;
				} else if (
					answer[Object.keys(answer)].userAnswer == false &&
					answer[Object.keys(answer)].correctAnswer == 'no'
				) {
					intermediaryScore++;
				}
			});
			score.score = intermediaryScore;
		});

		scoresFinal = scoresFinal.sort((a, b) => b.score - a.score);

		setScores(scoresFinal);
	};

	useEffect(() => {
		createScoreArray();
	}, []);

	return (
		<div className='w-full h-full bg-slate-200 dark:bg-slate-950 text-slate-900 dark:text-slate-200 flex flex-col justify-center items-center'>
			<h1 className='text-xl mb-12'>
				{props.lang == 'no' ? 'Poengtavle' : 'Score Board'}
			</h1>

			<div className='flex items-center justify-center'>
				{props.answers.length > 0 ? (
					<div>
						{scores.map((score, index) => (
							<UserScore
								key={index}
								userName={score.userName}
								score={score.score}
								questionsLength={props.questions.length}
							/>
						))}
					</div>
				) : (
					<p className='flex text-center'>
						{props.lang == 'no'
							? 'Her var det tomt.. Sjekk tilbake seinere!'
							: 'Wow, such empty.'}
					</p>
				)}
			</div>
		</div>
		// </div>
	);
};

export default Scoreboard;
