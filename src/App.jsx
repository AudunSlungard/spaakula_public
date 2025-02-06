import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/LogIn';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [lang, setLang] = useState('no');
	const [theme, setTheme] = useState(false);

	useEffect(() => {
		if (
			window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches
		) {
			setTheme(true);
		}
	}, []);

	useEffect(() => {
		if (theme) {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
	}, [theme]);

	return (
		<div
			id='app'
			className='bg-slate-200 text-slate-950 dark:bg-slate-950 dark:text-slate-200 h-full w-full min-h-screen'
		>
			<button
				className='border-slate-950 dark:border-slate-200 hover:border-orange-500 dark:hover:border-orange-500 px-2 border-b-2 font-semibold transition focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 absolute right-4 top-4'
				onClick={() => {
					lang == 'en' ? setLang('no') : setLang('en');
				}}
			>
				{lang == 'en' ? 'Norsk' : 'English'}
			</button>
			<button
				onClick={(e) => {
					setTheme(!theme);
					e.target.blur();
				}}
				tabIndex={0}
				className='absolute right-4 bottom-4 h-8 w-8 flex items-center justify-center rounded-full bg-slate-950 text-slate-200 dark:bg-slate-200 dark:text-slate-950 focus-visible:bg-orange-500 dark:focus-visible:bg-orange-500 focus:outline-none'
			>
				{theme ? (
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
							d='M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
						/>
					</svg>
				) : (
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
							d='M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z'
						/>
					</svg>
				)}
			</button>
			<Router>
				<Routes>
					<Route exact path='/' element={<Home lang={lang} />} />
					<Route path='/login' element={<Login lang={lang} />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
