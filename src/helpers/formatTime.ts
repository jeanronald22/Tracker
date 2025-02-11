export const formatTime = (seconde: number) => {
	const minutes = Math.floor(seconde / 60)
		.toString()
		.padStart(2, '0');
	const secondes = Math.floor(seconde % 60)
		.toString()
		.padStart(2, '0');
	return `${minutes}:${secondes}`;
};
