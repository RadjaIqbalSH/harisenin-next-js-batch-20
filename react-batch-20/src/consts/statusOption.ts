interface IStatusOption {
	id: number;
	label: string;
	value: string;
}

export const STATUS_OPTION: IStatusOption[] = [
	{
		id: 1,
		label: "To Do",
		value: "to-do",
	},
	{
		id: 1,
		label: "In Progress",
		value: "in-progress",
	},
	{
		id: 1,
		label: "Done",
		value: "done",
	},
];
