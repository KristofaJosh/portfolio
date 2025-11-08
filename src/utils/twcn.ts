import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const twcn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};
