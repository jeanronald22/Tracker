import { useEffect, useReducer, useState } from 'react';
import { pomodoroReducer } from './store/reducer';
import { initialState } from './store/initialState';
import { Actions } from './store/action';
import { formatTime } from '@/helpers/formatTime';
import focus from '@/assets/concentration.png';
import relaxation from '@/assets/relaxation.png';
import { Button } from '@/components/ui/button';
import {
	CircleFadingArrowUpIcon,
	CircleStopIcon,
	Edit2,
	PlaySquareIcon,
	Settings,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressRing } from '@/components/ProsseRing';
import Modal from '@/components/ui/Modale';
import { Input } from '@/components/ui/input';
import alerts from '@/assets/audio/alerts.wav';
import clock from '@/assets/audio/clock.wav';

export function Pomodoro() {
	// Instances audio
	const tickAudio = new Audio(clock);
	const alertAudio = new Audio(alerts);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [state, dispatch] = useReducer(pomodoroReducer, initialState);
	const [data, setData] = useState({
		work: state.workDuration / 60,
		break: state.breakDuration / 60,
	});

	const progress =
		state.sessionType === 'work'
			? ((state.workDuration - state.timeLeft) / state.workDuration) * 100
			: ((state.breakDuration - state.timeLeft) / state.breakDuration) *
			  100;

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleChange = (field: string, value: string) => {
		const newVal = parseInt(value, 10);
		if (!isNaN(newVal)) {
			setData((prev) => ({
				...prev,
				[field]: newVal,
			}));
		}
	};

	const handlerEditeTime = () => {
		dispatch({
			type: Actions.EDIT_TIME,
			payload: {
				workDuration: data.work * 60,
				breakDuration: data.break * 60,
			},
		});
		closeModal();
	};

	const handlePause = () => {
		dispatch({ type: Actions.PAUSE });
		tickAudio.pause(); // Arrêter le son de tic-tac
		tickAudio.currentTime = 0; // Réinitialiser le son
	};

	const handleReset = () => {
		dispatch({ type: Actions.RESET });
		tickAudio.pause(); // Arrêter le son de tic-tac
		tickAudio.currentTime = 0; // Réinitialiser le son
		alertAudio.pause(); // Arrêter l'alarme
		alertAudio.currentTime = 0; // Réinitialiser l'alarme
	};

	useEffect(() => {
		if (isModalOpen) {
			setData({
				work: state.workDuration / 60,
				break: state.breakDuration / 60,
			});
		}
	}, [isModalOpen, state.workDuration, state.breakDuration]);

	useEffect(() => {
		let interval: NodeJS.Timeout;
		tickAudio.load();
		alertAudio.load();

		if (state.isRunning) {
			interval = setInterval(() => {
				if (state.timeLeft > 0) {
					dispatch({ type: Actions.DECREMENT_TIME });
					if (document.hasFocus()) {
						tickAudio.play().catch((error) => {
							console.error(
								'Erreur lors de la lecture du son de tic-tac :',
								error
							);
						});
					}
				} else {
					dispatch({ type: Actions.SWITCH_SESSION });
					dispatch({ type: Actions.PAUSE });
					if (document.hasFocus()) {
						alertAudio.play().catch((error) => {
							console.error(
								"Erreur lors de la lecture de l'alarme :",
								error
							);
						});
					}
				}
			}, 1000);
		}

		return () => {
			clearInterval(interval);
			tickAudio.pause();
			tickAudio.currentTime = 0;
		};
	}, [state.isRunning, state.timeLeft]);

	return (
		<div className="grid min-h-screen md:grid-cols-2 overflow-hidden">
			{/* Section Image Fixe */}
			<div className="hidden md:flex justify-center items-center">
				<AnimatePresence mode="wait">
					<motion.img
						key={state.sessionType} // Utiliser sessionType comme clé
						src={state.sessionType === 'work' ? focus : relaxation}
						alt={
							state.sessionType === 'work'
								? 'Concentration'
								: 'Détente'
						}
						className="inset-0 w-auto object-cover"
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
							key={state.sessionType} // Utiliser sessionType comme clé
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className="text-center mb-8"
						>
							{state.sessionType === 'work' ? (
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
							onClick={handlePause}
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
								{state.isRunning ? 'Continuer' : 'Commencer'}
							</span>
						</Button>

						<Button
							onClick={handleReset}
							variant="outline"
							className="gap-2 transition-transform hover:scale-105"
						>
							<CircleFadingArrowUpIcon className="h-5 w-5" />
							<span>Réinitialiser</span>
						</Button>
					</motion.div>

					{/* Réglages */}
					<Modal
						isOpen={isModalOpen}
						onClose={closeModal}
						title="Ajuster les réglages"
					>
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							transition={{ duration: 0.3 }}
						>
							{/* formulaire de modification */}
							<div>
								<label className="text-lg">
									Temps de travail
								</label>
								<Input
									type="number"
									placeholder="Temps de travail"
									value={data.work}
									className="my-2"
									onChange={(e) =>
										handleChange('work', e.target.value)
									}
								/>
							</div>
							<div>
								<label className="text-lg">
									Temps de pause
								</label>
								<Input
									type="number"
									placeholder="Temps de pause"
									value={data.break}
									className="my-2"
									onChange={(e) =>
										handleChange('break', e.target.value)
									}
								/>
							</div>
							<Button className="mt-5" onClick={handlerEditeTime}>
								<Edit2 />
								<span>Modifier</span>
							</Button>
						</motion.div>
					</Modal>
					<div
						className="flex space-x-3 mt-5 cursor-pointer font-mono text-card-foreground"
						onClick={openModal}
					>
						<Settings />
						<p>Réglages</p>
					</div>
				</motion.div>
			</ProgressRing>
		</div>
	);
}
