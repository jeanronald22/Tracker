import { pomodoroType } from '@/Types/type';
import { Actions } from './action';
import { initialState } from './initialState';

// fonction reductrice
export function pomodoroReducer(state: pomodoroType, action: { type: string }) {
	let newSessionType: string;
	switch (action.type) {
		case Actions.START:
			return { ...state, isRunning: true };
		case Actions.PAUSE:
			return { ...state, isRunning: false };
		case Actions.RESET:
			return { ...initialState, sessionType: state.sessionType };
		case Actions.DECREMENT_TIME:
			if (state.timeLeft === 0) {
				// si le temps est écouler on ne fais rien (se switch sera gérer ailleur)
				return state;
			}
			return { ...state, timeLeft: state.timeLeft - 1 };
		case Actions.SWITCH_SESSION:
			newSessionType = state.sessionType === 'work' ? 'break' : 'work';
			return {
				...state,
				timeLeft:
					newSessionType === 'work'
						? state.workDuration
						: state.breakDuration,
			};
		default:
			return state;
	}
}
