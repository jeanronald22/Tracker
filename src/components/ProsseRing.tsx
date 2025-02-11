import { ProgressRingProps } from '@/Types/type';
import { motion } from 'framer-motion';

export function ProgressRing({
	progress,
	size = 200,
	strokeWidth = 10,
	color = '#3b82f6', // Couleur par défaut (bleu Tailwind)
	children,
}: ProgressRingProps) {
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (progress / 100) * circumference;

	return (
		<div className="relative flex items-center justify-center">
			{/* Cercle de progression */}
			<motion.svg
				width={size}
				height={size}
				className=""
				initial={{ strokeDashoffset: circumference }}
				animate={{ strokeDashoffset: offset }}
				transition={{ duration: 0.5, ease: 'easeInOut' }}
			>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					strokeWidth={strokeWidth}
					stroke={color}
					fill="transparent"
					strokeDasharray={circumference}
					strokeLinecap="round"
				/>
			</motion.svg>

			{/* Contenu au centre */}
			<div className="absolute flex items-center justify-center">
				{children}
			</div>
		</div>
	);
}
