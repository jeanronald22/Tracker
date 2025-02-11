import { pomodoroType } from '@/Types/type';

export const initialState: pomodoroType = {
	timeLeft: 25 * 60, // 25 minutes en secondes
	workDuration: 25 * 60,
	breakDuration: 5 * 60,
	isRunning: false,
	sessionType: 'work', // 'work' ou 'break'
};
