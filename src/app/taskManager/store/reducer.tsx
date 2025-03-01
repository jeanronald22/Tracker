import { TodoAction, TodoType } from '@/Types/type';
import { actionToDo } from './action';

export const todoReducer = (
	state: TodoType[],
	action: TodoAction
): TodoType[] => {
	switch (action.type) {
		case actionToDo.ADD_TODO: {
			const newTodo: TodoType = {
				id: Date.now().toString(),
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				...action.payload,
			};
			return [...state, newTodo];
		}

		case actionToDo.EDIT_TODO:
			return state.map((todo) =>
				todo.id === action.payload.id
					? {
							...todo,
							...action.payload.updates,
							updatedAt: new Date().toISOString(),
					  }
					: todo
			);

		case actionToDo.DELETE_TODO:
			return state.filter((todo) => todo.id !== action.payload.id);

		case actionToDo.TOGGLE_STATUS:
			return state.map((todo) =>
				todo.id === action.payload.id
					? {
							...todo,
							status:
								todo.status === 'todo'
									? 'inprogress'
									: todo.status === 'inprogress'
									? 'done'
									: 'todo',
							updatedAt: new Date().toISOString(),
					  }
					: todo
			);

		default:
			return state;
	}
};
