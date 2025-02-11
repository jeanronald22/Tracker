import { useEffect, useReducer } from 'react';
import { pomodoroReducer } from './reducer/reducer';
import { initialState } from './reducer/initialState';
import { Actions } from './reducer/action';
import { formatTime } from '@/helpers/formatTime';
import focus from '@/assets/concentration.png';
import relaxation from '@/assets/relaxation.png';
import { Button } from '@/components/ui/button';
import {
	CircleFadingArrowUpIcon,
	CircleStopIcon,
	PlaySquareIcon,
	Settings,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressRing } from '@/components/ProsseRing';

export function Pomodoro() {
	const [state, dispatch] = useReducer(pomodoroReducer, initialState);
	// Calcul de la progression en pourcentage
	const progress =
		((state.workDuration - state.timeLeft) / state.workDuration) * 100;

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (state.isRunning) {
			interval = setInterval(() => {
				if (state.timeLeft > 0) {
					dispatch({ type: Actions.DECREMENT_TIME });
				} else {
					dispatch({ type: Actions.SWITCH_SESSION });
					dispatch({ type: Actions.PAUSE });
				}
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [state.isRunning, state.timeLeft]);

	return (
		<div className="grid min-h-screen md:grid-cols-2 overflow-hidden">
			{/* Section Image Fixe */}
			<div className="hidden  md:flex justify-center items-center">
				<AnimatePresence mode="wait">
					<motion.img
						key={state.isRunning ? 'focus' : 'relaxation'}
						src={state.isRunning ? focus : relaxation}
						alt={state.isRunning ? 'Concentration' : 'Détente'}
						className="inset-0 h-10/12 w-10/12 object-cover"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.7, ease: 'easeInOut' }}
						whileHover={{ scale: 1.1 }}
					/>
				</AnimatePresence>
			</div>

			{/* Section Contenu */}
			<ProgressRing progress={progress} size={600}>
				<motion.div
					className="flex flex-col items-center justify-center p-8"
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 1 }}
				>
					<AnimatePresence mode="wait">
						<motion.div
							key={state.isRunning ? 'working' : 'resting'}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className="text-center mb-8"
						>
							{state.isRunning ? (
								<div>
									<h1 className="text-3xl font-bold text-foreground mb-2">
										Plongez dans votre travail 🚀
									</h1>
									<p className="text-muted-foreground">
										Concentrez-vous intensément pour
										maximiser votre productivité.
									</p>
								</div>
							) : (
								<div>
									<h1 className="text-3xl font-bold text-foreground mb-2">
										Prenez une pause bien méritée 🌴
									</h1>
									<p className="text-muted-foreground">
										Respirez, détendez-vous et rechargez vos
										batteries.
									</p>
								</div>
							)}
						</motion.div>
					</AnimatePresence>

					{/* Timer */}
					<motion.div
						className="text-8xl font-mono font-bold mb-8 text-primary"
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						transition={{ type: 'spring', stiffness: 100 }}
					>
						{formatTime(state.timeLeft)}
					</motion.div>

					{/* Boutons */}
					<motion.div
						className="flex flex-col md:flex-row gap-4 w-full max-w-xs"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<Button
							onClick={() => dispatch({ type: Actions.PAUSE })}
							variant="outline"
							className="gap-2 transition-transform hover:scale-105"
						>
							<CircleStopIcon className="h-5 w-5" />
							<span>Pause</span>
						</Button>

						<Button
							onClick={() => dispatch({ type: Actions.START })}
							className="gap-2 transition-transform hover:scale-105"
						>
							<PlaySquareIcon className="h-5 w-5" />
							<span>
								{state.timeLeft === 25 * 60
									? 'Commencer'
									: 'Continuer'}
							</span>
						</Button>

						<Button
							onClick={() => dispatch({ type: Actions.RESET })}
							variant="outline"
							className="gap-2 transition-transform hover:scale-105"
						>
							<CircleFadingArrowUpIcon className="h-5 w-5" />
							<span>Réinitialiser</span>
						</Button>
					</motion.div>

					{/* Réglages */}
					<div className="flex space-x-3 mt-5 cursor-pointer font-mono text-card-foreground">
						<Settings />
						<p>Réglages</p>
					</div>
				</motion.div>
			</ProgressRing>
		</div>
	);
}
