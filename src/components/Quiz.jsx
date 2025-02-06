import React, { useEffect, useState } from 'react';
import { doc, getDoc, getDocs, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase-config';
import { use } from 'react';
import Question from './Question';

const Quiz = (props) => {
	const [questions, setQuestions] = useState([]);
	const [message, setMessage] = useState('');
	const [userName, setUserName] = useState('');

	const questionsRef = collection(db, 'questions');
	const getData = async () => {
		const data = await getDocs(questionsRef);
		setQuestions(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
	};

	useEffect(() => {
		getData();
	}, []);

	const [modalIsOpen, setIsOpen] = useState(false);

	Modal.setAppElement('#root');

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const [answers, setAnswers] = useState([]);

	const submitAnswers = async () => {
		if (userName.length == 0) {
			setMessage('Du må skrive inn et kallenavn');
			setTimeout(() => {
				setMessage('');
			}, 3000);
		} else {
			try {
				await addDoc(collection(db, 'answers'), {
					userID: props.userID,
					userName: userName,
					answers: answers,
				}).then(() => {
					setMessage('Ditt svar er sendt!');
					setTimeout(() => {
						setMessage('');
						closeModal();
						window.location.reload();
					}, 3000);
				});
			} catch (error) {
				setMessage(error.message);

				setTimeout(() => {}, 3000);
				setMessage('');
			}
		}
	};

	return (
		<div className='h-full w-full flex flex-col items-center bg-slate-200 dark:bg-slate-950 text-slate-950 dark:text-slate-200'>
			<h2 className='text-xl mb-12'>
				{props.lang == 'no' ? 'Spørsmål' : 'Questions'}
			</h2>
			{questions.map((question, index) => (
				<Question
					key={index}
					question={question}
					lang={props.lang}
					answers={answers}
					setAnswers={setAnswers}
				/>
			))}
			<button
				onClick={openModal}
				className='border-slate-950 dark:border-slate-200 hover:border-orange-500 dark:hover:border-orange-500 focus:bg-orange-500 focus:outline-none active:scale-105 px-12 py-2 border font-semibold transition'
			>
				{props.lang == 'no' ? 'Send inn svar' : 'Submit answers'}
			</button>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				className={
					// 'w-full h-full bg-slate-900 p-12 flex flex-col justify-center align-center'
					'w-full h-full bg-slate-200 dark:bg-slate-950 text-slate-900 dark:text-slate-200 flex flex-col justify-center items-center'
				}
				contentLabel='Submit Answers Modal'
			>
				<label htmlFor='nameInput'>
					{props.lang == 'no'
						? 'Til sist må du skrive inn et kallenavn. Det er dette som vil vises på ledertavlen.'
						: 'Lastly, please enter a nickname. This will be displayed on the scoreboard.'}
				</label>
				<input
					type='text'
					id='nameInput'
					// className='border border-white p-2 mb-12 mt-4'
					className='p-2 bg-slate-200 border border-slate-950 dark:bg-slate-950 dark:text-slate-200 dark:border-slate-200 focus:outline-none focus:border-orange-500 focus:bg-slate-100	focus:dark:bg-slate-800 dark:focus:border-orange-500'
					placeholder={props.lang == 'no' ? 'Navn' : 'Name'}
					onChange={(e) => {
						setUserName(e.target.value);
					}}
				/>

				<p>
					{props.lang == 'no'
						? 'Er du sikker på at du vil sende inn? Du får ikke endret svarene dine'
						: 'Are you absolutely sure you want to submit your answers? No taksies backsies!'}
				</p>
				<div>
					<div className='flex justify-around mt-12 gap-4'>
						<button
							className='border-slate-950 dark:border-slate-200 hover:border-orange-500 dark:hover:border-orange-500 focus:bg-orange-500 focus:outline-none active:scale-105 px-12 py-2 border font-semibold transition'
							onClick={closeModal}
						>
							{props.lang == 'no' ? 'Gå tilbake' : 'Go back'}
						</button>
						<button
							className='border-slate-950 dark:border-slate-200 hover:border-orange-500 dark:hover:border-orange-500 focus:bg-orange-500 focus:outline-none active:scale-105 px-12 py-2 border font-semibold transition'
							onClick={() => {
								submitAnswers();
							}}
						>
							{props.lang == 'no' ? 'Send inn' : 'Submit'}
						</button>
					</div>
					<p className='text-xl text-center text-orange-500 mt-12'>{message}</p>
				</div>
			</Modal>
		</div>
	);
};

export default Quiz;
