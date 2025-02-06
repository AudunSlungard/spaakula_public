import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import Scoreboard from '../components/Scoreboard';
import Quiz from '../components/Quiz';
import Modal from 'react-modal';
import { getDocs, collection } from 'firebase/firestore';
import UserAnswers from './UserAnswers';

export const Home = (props) => {
	const [user, loading, error] = useAuthState(auth);
	const [answers, setAnswers] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [isQuizAvailable, setIsQuizAvailable] = useState(true);

	const navigate = useNavigate();

	const handleLogout = () => {
		auth
			.signOut()
			.then(() => {
				console.log('successfully logged out');
				navigate('/');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const userID = user ? user.uid : '';

	const answersRef = collection(db, 'answers');
	const getAnswers = async () => {
		const data = await getDocs(answersRef).then((data) => {
			setAnswers(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
		});
	};

	useEffect(() => {
		getAnswers();
	}, []);

	const questionsRef = collection(db, 'questions');
	const getQuestions = async () => {
		const data = await getDocs(questionsRef);
		setQuestions(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
	};

	useEffect(() => {
		getQuestions();
	}, []);

	const checkIfQuizAvailable = () => {
		let userIDs = [];
		let quizAvailable = true;
		answers.forEach((a) => {
			userIDs.push(a.userID);
		});

		if (userIDs.includes(userID)) {
			quizAvailable = false;
		}

		let lastDay = new Date('2025-11-02T00:00:00');
		let today = new Date();
		if (lastDay < today) {
			quizAvailable = false;
		}
		setIsQuizAvailable(quizAvailable);
	};

	useEffect(() => {
		checkIfQuizAvailable();
	}, [answers, isQuizAvailable]);

	const [scoreModalIsOpen, setScoreModalIsOpen] = useState(false);

	Modal.setAppElement('#root');

	const openScoreModal = () => {
		setScoreModalIsOpen(true);
	};

	const closeScoreModal = () => {
		setScoreModalIsOpen(false);
	};

	const [answerModalIsOpen, setAnswerIsOpen] = useState(false);

	const openAnswerModal = () => {
		setAnswerIsOpen(true);
	};

	const closeAnswerModal = () => {
		setAnswerIsOpen(false);
	};

	return (
		<div className='h-full min-h-screen flex flex-col justify-center items-center'>
			{loading ? (
				<div>{props.lang == 'no' ? 'Laster...' : 'Loading...'}</div>
			) : (
				<>
					{user ? (
						<div className='h-full flex flex-col justify-center items-center'>
							<div className='flex h-full w-full justify-center items-center gap-4 mb-12 mt-16 md:mt-4'>
								<button
									// tabIndex={1}
									onClick={() => {
										openScoreModal();
									}}
									className='border-slate-950 dark:border-slate-200 hover:border-orange-500 dark:hover:border-orange-500 px-2 border-b-2 font-semibold transition focus:outline-none focus:border-orange-500 dark:focus:border-orange-500'
								>
									{props.lang == 'no' ? 'Se ledertavlen' : 'View Scoreboard'}
								</button>
								<button
									// tabIndex={2}
									onClick={() => {
										openAnswerModal();
									}}
									className='border-slate-950 dark:border-slate-200 hover:border-orange-500 dark:hover:border-orange-500 px-2 border-b-2 font-semibold transition focus:outline-none focus:border-orange-500 dark:focus:border-orange-500'
								>
									{props.lang == 'no' ? 'Se dine svar' : 'View your answers'}
								</button>
							</div>

							<h1 className='text-5xl text-center text-orange-500 mb-12'>
								SPÅKULA 2025
							</h1>

							<button
								className='border-slate-950 dark:border-slate-200 hover:border-orange-500 dark:hover:border-orange-500 focus:bg-orange-500 focus:outline-none active:scale-105 px-12 py-2 border font-semibold transition absolute left-4 top-4'
								onClick={handleLogout}
							>
								{props.lang == 'no' ? 'Logg ut' : 'Sign out'}
							</button>

							{isQuizAvailable ? (
								<Quiz lang={props.lang} userID={userID} />
							) : (
								<div className='text-xl'>
									{props.lang == 'no'
										? 'Du har ikke lenger mulighet til å sende inn svar'
										: 'You are no longer able to submit answers.'}
								</div>
							)}
							<Modal
								isOpen={scoreModalIsOpen}
								onRequestClose={closeScoreModal}
								className={'w-full h-full outline-none'}
								contentLabel='Scoreboard Modal'
							>
								<button
									className='h-8 w-8 flex items-center justify-center rounded-full bg-slate-950 text-slate-200 dark:bg-slate-200 dark:text-slate-950 focus:bg-orange-500 dark:focus:bg-orange-500 focus:outline-none absolute top-4 right-4'
									onClick={closeScoreModal}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='size-6'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M6 18 18 6M6 6l12 12'
										/>
									</svg>
								</button>
								<Scoreboard
									lang={props.lang}
									answers={answers}
									questions={questions}
								/>
							</Modal>
							<Modal
								isOpen={answerModalIsOpen}
								onRequestClose={closeAnswerModal}
								className={'w-full h-full overflow-auto outline-none'}
								contentLabel='User Answers Modal'
							>
								<button
									className='h-8 w-8 flex items-center justify-center rounded-full bg-slate-950 text-slate-200 dark:bg-slate-200 dark:text-slate-950 focus:bg-orange-500 dark:focus:bg-orange-500 focus:outline-none absolute top-4 right-4'
									onClick={closeAnswerModal}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='size-6'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M6 18 18 6M6 6l12 12'
										/>
									</svg>
								</button>
								<UserAnswers
									lang={props.lang}
									answers={answers}
									questions={questions}
									userID={user.uid}
								/>
							</Modal>
						</div>
					) : (
						<div className='flex flex-col justify-center items-center h-full w-full min-h-screen'>
							<h1 className='text-orange-500 text-5xl text-center mb-12'>
								SPÅKULA 2025
							</h1>
							<button
								className='border-slate-950 dark:border-slate-200 hover:border-orange-500 dark:hover:border-orange-500 focus:bg-orange-500 focus:outline-none active:scale-105 px-12 py-2 border font-semibold transition'
								onClick={() => navigate('/login')}
							>
								{props.lang == 'no' ? 'Logg inn' : 'Sign In'}
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Home;
