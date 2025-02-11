export interface pomodoroType {
	timeLeft: number;
	workDuration: number;
	breakDuration: number;
	isRunning: boolean;
	sessionType: string;
}

export interface ProgressRingProps {
	progress: number; // Valeur de progression entre 0 et 100
	size?: number; // Taille du cercle (diamètre)
	strokeWidth?: number; // Épaisseur du trait
	color?: string; // Couleur de la progression
	children?: React.ReactNode; // Contenu à afficher au centre
}
