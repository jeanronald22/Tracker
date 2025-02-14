import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Importez motion et AnimatePresence
import { Button } from './button';

interface ModalProps {
	title: string; // Titre de la modale
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center z-50"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
				>
					<motion.div
						className="bg-white p-6 rounded-lg shadow-lg relative max-w-[90%] md:max-w-[500px] w-full mx-4"
						initial={{ y: -50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 50, opacity: 0 }}
						onClick={(e) => e.stopPropagation()} // Empêcher la fermeture lors du clic sur la modale
					>
						{/* Bouton de fermeture */}
						<Button
							onClick={onClose}
							className="absolute top-3 right-3 bg-transparent border-none text-xl cursor-pointer text-gray-600 hover:text-gray-900"
						>
							&times;
						</Button>

						{/* Titre de la modale */}
						<h2 className="text-xl font-bold mb-4 text-gray-800">
							{title}
						</h2>

						{/* Contenu de la modale */}
						<div className="text-gray-700">{children}</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
