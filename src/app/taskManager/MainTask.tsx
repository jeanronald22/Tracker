import { useReducer, useState, useEffect } from 'react';
import { todoReducer } from './store/reducer';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/ui/Modale';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import KanbanBoard from '@/components/Kanbanboard';

interface TaskData {
	title: string;
	description: string;
	priority: 'low' | 'medium' | 'high';
	status: 'todo' | 'in-progress' | 'done';
}

const MainTask = () => {
	// Initialiser l'état avec les données du localStorage
	const initialState = JSON.parse(localStorage.getItem('todos') || '[]');

	const [state, dispatch] = useReducer(todoReducer, initialState);

	const [isOpen, setisOpen] = useState<boolean>(false);
	const [taskData, setTaskData] = useState<TaskData>({
		title: '',
		description: '',
		priority: 'low',
		status: 'todo',
	});

	// Functions
	const toogleModal = () => setisOpen((prev) => !prev);

	const handleChange = (field: keyof TaskData, value: string) => {
		setTaskData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = () => {
		// Validation rapide
		if (!taskData.title.trim()) {
			alert('Le titre est obligatoire');
			return;
		}

		// Ajouter la tâche
		dispatch({ type: 'ADD_TODO', payload: taskData });

		// Fermer le modal et réinitialiser les champs
		toogleModal();
		setTaskData({
			title: '',
			description: '',
			priority: 'low',
			status: 'todo',
		});
	};

	// Effectuer la mise à jour du localStorage quand l'état change
	useEffect(() => {
		if (state.length > 0) {
			localStorage.setItem('todos', JSON.stringify(state));
		}
	}, [state]);

	return (
		<div className="min-h-screen bg-transparent">
			{/* Button to create a new task */}
			<Modal
				title="Enregistrer une nouvelle tâche"
				isOpen={isOpen}
				onClose={toogleModal}
			>
				<div>
					<label className="text-lg">Titre de la tâche</label>
					<Input
						type="text"
						value={taskData.title}
						className="my-2"
						onChange={(e) => handleChange('title', e.target.value)}
					/>
				</div>
				<div>
					<label className="text-lg">Description de la tâche</label>
					<Textarea
						value={taskData.description}
						className="my-2"
						onChange={(e) =>
							handleChange('description', e.target.value)
						}
					/>
				</div>
				<div className="flex my-5 justify-between gap-2">
					<Select
						value={taskData.priority}
						onValueChange={(e) => handleChange('priority', e)}
					>
						<Button
							variant="outline"
							className="bg-transparent flex-1 gap-1"
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Selectionner une priorites" />
							</SelectTrigger>
						</Button>
						<SelectContent className="bg-card">
							<SelectGroup>
								<SelectItem value="low">Faible</SelectItem>
								<SelectItem value="medium">Moyen</SelectItem>
								<SelectItem value="high">Élevé</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

					<Select
						value={taskData.status}
						onValueChange={(e) => handleChange('status', e)}
					>
						<Button
							variant="outline"
							className="bg-transparent flex-1"
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Selectionner le status" />
							</SelectTrigger>
						</Button>
						<SelectContent className="dark:bg-card">
							<SelectGroup>
								<SelectItem value="todo">À faire</SelectItem>
								<SelectItem value="in-progress">
									En cours
								</SelectItem>
								<SelectItem value="done">Terminé</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				{/* Validation */}
				<Button
					className="font-mono font-semibold text-md"
					onClick={handleSubmit}
				>
					Enregistrer
				</Button>
			</Modal>
			<div className="p-6">
				<Button
					variant="outline"
					className="text-md font-mono"
					onClick={toogleModal}
				>
					<PlusCircle />
					Nouvelle Tâche
				</Button>
			</div>
			{/* listes des taches */}
			<KanbanBoard todos={state} dispatch={dispatch} />
		</div>
	);
};

export default MainTask;
