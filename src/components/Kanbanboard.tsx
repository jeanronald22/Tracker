import React from 'react';
import { TodoType } from '@/Types/type';
import Column from './Column';

interface KanbanBoardProps {
	todos: TodoType[];
	dispatch: React.Dispatch<any>;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ todos, dispatch }) => {
	const columns = [
		{ id: 'todo', title: 'À faire' },
		{ id: 'in-progress', title: 'En cours' },
		{ id: 'done', title: 'Terminé' },
	];

	return (
		<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
			{columns.map((column) => (
				<Column
					key={column.id}
					title={column.title}
					columnId={column.id as TodoType['status']}
					tasks={todos.filter((task) => task.status === column.id)}
					dispatch={dispatch}
				/>
			))}
		</div>
	);
};

export default KanbanBoard;
