import React from 'react';
import { TodoType } from '@/Types/type';
import { MoreVertical, Trash2 } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import formatDate from '@/helpers/dateFormater';

interface TaskItemProps {
  task: TodoType;
  index: number;
  dispatch: React.Dispatch<any>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, dispatch }) => {
  // Couleurs pour les priorités
  const priorityColors = {
    low: 'bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700',
    medium: 'bg-yellow-100 border-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-700',
    high: 'bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700'
  };

  // Traduire les priorités
  const priorityLabels = {
    low: 'Faible',
    medium: 'Moyen',
    high: 'Élevé'
  };


  
  const handleDelete = () => {
    dispatch({ type: 'DELETE_TODO', payload: {id:task.id} });
    
    // Mettre à jour localStorage
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const updatedTodos = todos.filter((t: TodoType) => t.id !== task.id);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
   
        <div
          className={`p-3 mb-2 rounded shadow border-l-4 ${priorityColors[task.priority]} ${
            task.status === 'done' ? 'opacity-50' : ''}`}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{task.title}</h3>
            <div className="flex items-center">
              <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 mr-2">
                {priorityLabels[task.priority]}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <MoreVertical className="h-4 w-4 text-gray-500" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    className="text-red-500 focus:text-red-500 cursor-pointer"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-2">
            {task.description}
          </p>
          
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Créé: {formatDate(task.createdAt)}</span>
            <span>Mis à jour: {formatDate(task.updatedAt)}</span>
          </div>
        </div>
      )}

export default TaskItem;
