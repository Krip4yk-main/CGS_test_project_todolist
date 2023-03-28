import React from 'react';

export enum IType {
	'PC' = 'PC',
	'TABLET' = 'TABLET',
	'PHONE' = 'PHONE',
	'INITIAL' = 'INITIAL',
}

export interface HeadCell {
	id: OrderBy;
	label: string;
}

export interface EnhancedTableProps {
	onRequestSort: (event: React.MouseEvent<unknown>, property: OrderBy) => void;
	order: Order;
	orderBy: string;
}

export type Order = 'ASC' | 'DESC';

export type OrderBy = 'name' | 'details';

export interface ITodoForm {
	name: string;
	details: string;
	private: boolean;
	done: boolean;
}

export type TFilter = 'All' | 'Private' | 'Public' | 'Completed';
