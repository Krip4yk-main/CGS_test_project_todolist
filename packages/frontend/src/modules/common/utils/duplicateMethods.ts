import { Order } from '../types/components.types';

export const sort = <T>(array: T[], orderBy: keyof T, order: Order) => {
	const myOrder: boolean = order === 'ASC';
	return array.sort((a, b) => {
		if (!a[orderBy] || !b[orderBy]) return 0;
		if (typeof a[orderBy] === 'string') {
			if ((a[orderBy] as string).toUpperCase() > (b[orderBy] as string).toUpperCase()) return myOrder ? 1 : -1;
			if ((a[orderBy] as string).toUpperCase() === (b[orderBy] as string).toUpperCase()) return 0;
			return myOrder ? -1 : 1;
		} else {
			if (a[orderBy] > b[orderBy]) return myOrder ? 1 : -1;
			if (a[orderBy] === b[orderBy]) return 0;
			return myOrder ? -1 : 1;
		}
	});
};
