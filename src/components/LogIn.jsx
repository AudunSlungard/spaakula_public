import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase-config';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	isSignInWithEmailLink,
	sendSignInLinkToEmail,
	signInWithEmailLink,
} from 'firebase/auth';

export const Login = (props) => {
	const [user] = useAuthState(auth);

	const navigate = useNavigate();
	const location = useLocation();
	const { search } = location;

	const [email, setEmail] = useState('');

	const [loginLoading, setLoginLoading] = useState(false);
	const [loginError, setLoginError] = useState('');

	const [infoMsg, setInfoMsg] = useState('');

	const [initialLoading, setInitialLoading] = useState(false);
	const [initialError, setInitialError] = useState('');

	useEffect(() => {
		if (user) {
			// user is already signed in
			navigate('/');
		} else {
			// user is not signed in but the link is valid
			if (isSignInWithEmailLink(auth, window.location.href)) {
				// now in case user clicks the email link on a different device, we will ask for email confirmation
				let email = localStorage.getItem('email');
				if (!email) {
					email = window.prompt(
						{ lang } == 'no' ? 'Skriv inn eposten din' : 'Enter your email'
					);
				}
				// after that we will complete the login process
				setInitialLoading(true);
				signInWithEmailLink(
					auth,
					localStorage.getItem('email'),
					window.location.href
				)
					.then((result) => {
						// we can get the user from result.user but no need in this case
						localStorage.removeItem('email');
						setInitialLoading(false);
						setInitialError('');
						navigate('/');
					})
					.catch((err) => {
						setInitialLoading(false);
						setInitialError(err.message);
						navigate('/login');
					});
			} else {
				console.log('enter email and sign in');
			}
		}
	}, [user, search, navigate]);

	const handleLogin = (e) => {
		e.preventDefault();
		setLoginLoading(true);
		sendSignInLinkToEmail(auth, email, {
			// this is the URL that we will redirect back to after clicking on the link in mailbox
			// url: 'https://sunny-fenglisu-21c589.netlify.app/login',
			url: 'http://localhost:5173/login',
			handleCodeInApp: true,
		})
			.then(() => {
				localStorage.setItem('email', email);
				setLoginLoading(false);
				setLoginError('');
				setInfoMsg(
					props.lang == 'no'
						? 'Sjekk eposten din for å logge inn'
						: 'Check your email to sign in'
				);
				setTimeout(() => {
					setInfoMsg('');
				}, 3000);
			})
			.catch((err) => {
				setLoginLoading(false);
				setLoginError(err.message);
			});
	};

	return (
		<div className='h-full w-full min-h-screen flex flex-col justify-center items-center'>
			{initialLoading ? (
				<div className='text-xl text-orange-500'>
					{props.lang == 'no' ? 'Laster...' : 'Loading...'}
				</div>
			) : (
				<>
					{initialError !== '' ? (
						<div className='error-msg'>{initialError}</div>
					) : (
						<>
							{user ? (
								<div>
									{props.lang == 'no' ? 'Vennligst vent.' : 'Please wait...'}
								</div>
							) : (
								<form
									className='form-group custom-form flex flex-col gap-8'
									onSubmit={handleLogin}
								>
									<label className='text-center text-xl'>
										{props.lang == 'no'
											? 'Logg inn / registrer deg'
											: 'Sign in / register'}
									</label>
									<input
										type={'email'}
										required
										placeholder={props.lang == 'no' ? 'Epost' : 'Email'}
										className='form-control p-2 bg-slate-200 border border-slate-950 dark:bg-slate-950 dark:text-slate-200 dark:border-slate-200 focus:outline-none focus:border-orange-500 focus:bg-slate-100	focus:dark:bg-slate-800 dark:focus:border-orange-500'
										value={email || ''}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<button
										type='submit'
										className='border-slate-950 dark:border-slate-200 hover:border-orange-500 dark:hover:border-orange-500 focus:bg-orange-500 focus:outline-none active:scale-105 px-12 py-2 border font-semibold transition'
									>
										{loginLoading ? (
											<span>
												{props.lang == 'no'
													? 'Logger deg inn'
													: 'Logging you in'}
											</span>
										) : (
											<span>{props.lang == 'no' ? 'Logg inn' : 'Sign in'}</span>
										)}
									</button>

									{loginError !== '' && (
										<div className='text-orange-500 text-sm error-msg'>
											{loginError}
										</div>
									)}

									{infoMsg !== '' && (
										<div className='text-orange-500 text-sm'>{infoMsg}</div>
									)}
								</form>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Login;
