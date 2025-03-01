import { TodoType } from '@/Types/type';
import TaskItem from './TaskItem';
import { NotebookPen } from 'lucide-react';

interface ColumnProps {
	title: string;
	columnId: TodoType['status'];
	tasks: TodoType[];
	dispatch: React.Dispatch<any>;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, dispatch }) => {
	return (
		<div className="flex-1 bg-card text-card-foreground p-4 rounded-lg shadow-md">
			<div className="flex items-center justify-between mb-4">
				{title === 'À faire' && (
					<NotebookPen className="h-6 w-6 text-green-500" />
				)}

				{title === 'En cours' && (
					<NotebookPen className="h-6 w-6 text-primary" />
				)}
				{title === 'Terminé' && <NotebookPen className="h-6 w-6 " />}
				<h2 className="text-lg font-bold">{title}</h2>
				<span className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">
					{tasks.length}
				</span>
			</div>
			<div className="min-h-64 space-y-2">
				{tasks.map((task, index) => (
					<TaskItem
						key={task.id}
						task={task}
						index={index}
						dispatch={dispatch}
					/>
				))}
			</div>
		</div>
	);
};

export default Column;
